"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  Color,
  Mesh,
  Group,
  InstancedMesh,
  Matrix4,
  Raycaster,
  Vector2,
  TubeGeometry,
  CatmullRomCurve3,
  Vector3,
  CanvasTexture,
} from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import { hasFastWebGL } from "@/components/webgl";

type Rgba = { r: number; g: number; b: number; a: number };

function parseColorToRgba(input: string): Rgba {
  if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 };
  const str = input.trim();
  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
    const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
    const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
    const a =
      rgbaMatch[4] !== undefined
        ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
        : 1;
    return { r, g, b, a };
  }
  const hex = str.replace(/^#/, "");
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function mapLinear(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

const mapSpeedUiToInternal = (ui: number) =>
  ui === 0 ? 0 : mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0, 0.9);
const mapDensityUiToSpacing = (ui: number) =>
  mapLinear(Math.max(1, Math.min(10, ui)), 1, 10, 24, 8);
const mapScaleUiToMultiplier = (ui: number) =>
  mapLinear(Math.max(1, Math.min(20, ui)), 1, 20, 0.2, 2);
const mapDotSizeUiToMultiplier = (ui: number) =>
  mapLinear(Math.max(1, Math.min(10, ui)), 1, 10, 0.1, 0.5);
const mapMarkerDotSizeUiToMultiplier = (ui: number) =>
  mapLinear(Math.max(0, Math.min(100, ui)), 0, 100, 0.1, 2.5);
const normalizeSmoothing = (ui: number) => Math.max(0, Math.min(1, ui / 10));
const mapDragSpeedUiToSensitivity = (ui: number) =>
  mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0.001, 0.02);
const mapDetailToStepSize = (ui: number) =>
  mapLinear(Math.max(1, Math.min(10, ui)), 1, 10, 10, 1);

function simplifyRing(ring: number[][], detail: number): number[][] {
  if (ring.length < 2) return ring;
  if (detail >= 10) return ring;
  const stepSize = Math.max(1, Math.floor(mapDetailToStepSize(detail)));
  const simplified: number[][] = [ring[0]];
  for (let i = stepSize; i < ring.length - 1; i += stepSize) {
    simplified.push(ring[Math.min(i, ring.length - 1)]);
  }
  const last = ring[ring.length - 1];
  const first = ring[0];
  const closed =
    Math.abs(last[0] - first[0]) < 1e-4 && Math.abs(last[1] - first[1]) < 1e-4;
  if (!closed) simplified.push(last);
  return simplified.length >= 2 ? simplified : ring;
}

function latLngToPosition(lat: number, lng: number) {
  const latRad = lat * (Math.PI / 180);
  const lngRad = lng * (Math.PI / 180);
  return {
    x: Math.cos(latRad) * Math.sin(lngRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.cos(lngRad),
  };
}

interface Marker {
  lat: number;
  lng: number;
}
interface MarkerConfig {
  markers: Marker[];
  color: string;
  size: number;
}
interface DotsConfig {
  color: string;
  size: number;
  density: number;
  allDots: boolean;
}
interface GlobeProps {
  speed?: number;
  smoothing?: number;
  dots?: DotsConfig;
  fill?: "dots" | "solid";
  fillColor?: string;
  scale?: number;
  stopOnHover?: boolean;
  markerConfig?: MarkerConfig;
  direction?: "left" | "right";
  initialLatitude?: number;
  initialLongitude?: number;
  oceanColor?: string;
  outlineColor?: string;
  showOutline?: boolean;
  graticuleColor?: string;
  showGrid?: boolean;
  outlineWidth?: number;
  dragSpeed?: number;
  detail?: number;
  style?: CSSProperties;
}

export default function Globe({
  speed = 2,
  smoothing = 8,
  dots = { color: "#ffffff", size: 5, density: 8, allDots: false },
  fill = "dots",
  fillColor = "#ffffff",
  scale = 8,
  stopOnHover = true,
  markerConfig = { markers: [], color: "#00f7ff", size: 40 },
  direction = "left",
  initialLatitude = 23,
  initialLongitude = -23,
  oceanColor = "#000000",
  outlineColor = "#ffffff",
  showOutline = true,
  graticuleColor = "#D4D4D4",
  showGrid = true,
  outlineWidth = 1,
  dragSpeed = 5,
  detail = 5,
  style,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dotColor = dots.color;
  const dotSize = dots.size;
  const density = dots.density;
  const allDots = dots.allDots;
  const gridWidth = 1;
  const smoothingN = normalizeSmoothing(smoothing);

  const baseRotationSpeed = mapSpeedUiToInternal(speed);
  const rotationSpeed =
    direction === "left" ? -baseRotationSpeed : baseRotationSpeed;
  const dotSpacing = mapDensityUiToSpacing(density);
  const dotSizeMultiplier = mapDotSizeUiToMultiplier(dotSize);
  const markerRadiusMultiplier = mapMarkerDotSizeUiToMultiplier(
    markerConfig.size
  );
  const scaleMultiplier = mapScaleUiToMultiplier(scale);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.clientWidth || container.offsetWidth || 800;
    const containerHeight =
      container.clientHeight || container.offsetHeight || 600;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      50,
      containerWidth / containerHeight,
      0.1,
      1e3
    );
    const globeRadius = 1 * scaleMultiplier;
    const cameraDistance = 2.5 / scaleMultiplier;
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);

    // Browsers with hardware acceleration disabled throw here; bail out
    // quietly rather than taking the page down.
    if (!hasFastWebGL()) {
      setError("WebGL unavailable");
      setIsLoading(false);
      return;
    }

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setError("WebGL unavailable");
      setIsLoading(false);
      return;
    }
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = "srgb";
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.opacity = "0";
    canvas.style.visibility = "hidden";
    container.appendChild(canvas);

    const oceanRgba = parseColorToRgba(oceanColor);
    const outlineRgba = parseColorToRgba(outlineColor);
    const dotRgba = parseColorToRgba(dotColor);
    const graticuleRgba = parseColorToRgba(graticuleColor);
    const fillRgba = parseColorToRgba(fillColor);

    const oceanMesh = new Mesh(
      new SphereGeometry(globeRadius, 64, 64),
      new MeshBasicMaterial({
        color: oceanColor ? new Color(oceanColor) : new Color(0, 0, 0),
        transparent: oceanRgba.a < 1 || oceanRgba.a === 0,
        opacity: oceanRgba.a,
      })
    );

    const continentOutlineGroup = new Group();
    const graticuleGroup = new Group();

    const tubeFrom = (positions: number[], material: MeshBasicMaterial, w: number) => {
      if (!positions || positions.length < 6) return null;
      const points: Vector3[] = [];
      for (let i = 0; i < positions.length; i += 3) {
        points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
      }
      if (points.length < 2) return null;
      const curve = new CatmullRomCurve3(points);
      const geo = new TubeGeometry(curve, points.length * 2, (w / 10) * 0.01, 8, false);
      const mesh = new Mesh(geo, material);
      mesh.renderOrder = 0;
      return mesh;
    };

    if (showGrid && graticuleColor && graticuleRgba.a > 0) {
      const graticuleMaterial = new MeshBasicMaterial({
        color: new Color(graticuleColor),
        transparent: graticuleRgba.a < 1 || graticuleRgba.a === 0,
        opacity: graticuleRgba.a,
      });
      const gridSpacing = 15;
      for (let lat = -90; lat <= 90; lat += gridSpacing) {
        const positions: number[] = [];
        for (let i = 0; i <= 64; i++) {
          const lng = (i / 64) * 360 - 180;
          const p = latLngToPosition(lat, lng);
          positions.push(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
        }
        const m = tubeFrom(positions, graticuleMaterial, gridWidth);
        if (m) graticuleGroup.add(m);
      }
      for (let lng = -180; lng < 180; lng += gridSpacing) {
        const positions: number[] = [];
        for (let i = 0; i <= 64; i++) {
          const lat = (i / 64) * 180 - 90;
          const p = latLngToPosition(lat, lng);
          positions.push(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
        }
        const m = tubeFrom(positions, graticuleMaterial, gridWidth);
        if (m) graticuleGroup.add(m);
      }
    }

    let dotInstances: InstancedMesh | Mesh | null = null;
    let markerMeshes: Mesh[] = [];

    const globeGroup = new Group();

    const updateMarkers = () => {
      markerMeshes.forEach((mesh) => globeGroup.remove(mesh));
      markerMeshes = [];
      if (markerConfig.markers?.length) {
        const markerGeometry = new SphereGeometry(0.01 * markerRadiusMultiplier, 16, 16);
        const markerMaterial = new MeshBasicMaterial({
          color: markerConfig.color ? new Color(markerConfig.color) : new Color(1, 1, 1),
        });
        markerConfig.markers.forEach((marker) => {
          if (!marker || typeof marker.lat !== "number" || typeof marker.lng !== "number") return;
          const p = latLngToPosition(marker.lat, marker.lng);
          const mesh = new Mesh(markerGeometry, markerMaterial.clone());
          mesh.position.set(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
          globeGroup.add(mesh);
          markerMeshes.push(mesh);
        });
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");
        const landFeatures = await response.json();

        while (continentOutlineGroup.children.length > 0) {
          continentOutlineGroup.remove(continentOutlineGroup.children[0]);
        }

        if (showOutline && outlineColor && outlineRgba.a > 0) {
          const outlineMaterial = new MeshBasicMaterial({
            color: new Color(outlineColor),
            transparent: outlineRgba.a < 1,
            opacity: outlineRgba.a,
            depthTest: true,
            depthWrite: true,
          });
          const processRing = (ring: number[][]) => {
            if (ring.length < 2) return;
            const positions: number[] = [];
            simplifyRing(ring, detail).forEach(([lng, lat]) => {
              const p = latLngToPosition(lat, lng);
              positions.push(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
            });
            if (positions.length < 6) return;
            const points: Vector3[] = [];
            for (let i = 0; i < positions.length; i += 3) {
              points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
            }
            if (points.length && points[0].distanceTo(points[points.length - 1]) > 0.001) {
              points.push(points[0].clone());
            }
            if (points.length < 2) return;
            const curve = new CatmullRomCurve3(points);
            const geo = new TubeGeometry(curve, points.length * 2, (outlineWidth / 10) * 0.01, 8, false);
            const mesh = new Mesh(geo, outlineMaterial);
            mesh.renderOrder = 0;
            continentOutlineGroup.add(mesh);
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          landFeatures.features.forEach((feature: any) => {
            const t = (feature.properties?.featurecla || feature.properties?.type || "").toLowerCase();
            const n = (feature.properties?.name || "").toLowerCase();
            if (/graticule|grid|line/.test(t) || /graticule|grid|line/.test(n)) return;
            const geometry = feature.geometry;
            if (!geometry?.coordinates) return;
            if (geometry.type === "Polygon" && geometry.coordinates.length) {
              processRing(geometry.coordinates[0]);
            } else if (geometry.type === "MultiPolygon") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              geometry.coordinates.forEach((poly: any) => {
                if (poly.length) processRing(poly[0]);
              });
            }
          });
        }

        // land mask, sampled to decide where dots belong
        const bitmapWidth = 2048;
        const bitmapHeight = 1024;
        const offscreen = document.createElement("canvas");
        offscreen.width = bitmapWidth;
        offscreen.height = bitmapHeight;
        const ctx = offscreen.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Canvas not supported");
        const projection = geoEquirectangular().fitSize([bitmapWidth, bitmapHeight], {
          type: "Sphere",
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        const pathGenerator = geoPath().projection(projection).context(ctx);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, bitmapWidth, bitmapHeight);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        landFeatures.features.forEach((f: any) => pathGenerator(f));
        ctx.fill();
        const pixels = ctx.getImageData(0, 0, bitmapWidth, bitmapHeight).data;
        const isOnLand = (lng: number, lat: number) => {
          const x = Math.round(((lng + 180) / 360) * bitmapWidth) % bitmapWidth;
          const y = Math.max(0, Math.min(bitmapHeight - 1, Math.round(((90 - lat) / 180) * bitmapHeight)));
          return pixels[(y * bitmapWidth + x) * 4] > 128;
        };

        if (fill === "solid") {
          const texW = 1024;
          const texH = 512;
          const fillCanvas = document.createElement("canvas");
          fillCanvas.width = texW;
          fillCanvas.height = texH;
          const fctx = fillCanvas.getContext("2d")!;
          const img = fctx.createImageData(texW, texH);
          const data = img.data;
          const fr = Math.round(fillRgba.r * 255);
          const fg = Math.round(fillRgba.g * 255);
          const fb = Math.round(fillRgba.b * 255);
          const fa = Math.round((fillRgba.a || 1) * 255);
          for (let ty = 0; ty < texH; ty++) {
            for (let tx = 0; tx < texW; tx++) {
              let lng = (tx / texW - 0.25) * 360;
              lng = ((((lng + 180) % 360) + 360) % 360) - 180;
              const lat = (ty / texH - 0.5) * 180;
              const idx = (ty * texW + tx) * 4;
              if (allDots || isOnLand(lng, lat)) {
                data[idx] = fr;
                data[idx + 1] = fg;
                data[idx + 2] = fb;
                data[idx + 3] = fa;
              } else {
                data[idx + 3] = 0;
              }
            }
          }
          fctx.putImageData(img, 0, 0);
          const tex = new CanvasTexture(fillCanvas);
          tex.flipY = false;
          tex.needsUpdate = true;
          dotInstances = new Mesh(
            new SphereGeometry(globeRadius * 1.002, 64, 64),
            new MeshBasicMaterial({ map: tex, transparent: true })
          );
          globeGroup.add(dotInstances);
        } else {
          const dotCoordinates: number[][] = [];
          const baseStep = dotSpacing * 0.08;
          for (let lat = -90; lat <= 90; lat += baseStep) {
            const cosLat = Math.cos((Math.abs(lat) * Math.PI) / 180);
            const lngStep = cosLat > 0.01 ? baseStep / Math.max(0.3, cosLat) : 360;
            for (let lng = -180; lng < 180; lng += lngStep) {
              if (allDots || isOnLand(lng, lat)) dotCoordinates.push([lng, lat]);
            }
          }
          if (dotCoordinates.length) {
            const instanced = new InstancedMesh(
              new SphereGeometry(0.01 * dotSizeMultiplier, 4, 4),
              new MeshBasicMaterial({
                color: dotColor ? new Color(dotColor) : new Color(0.6, 0.6, 0.6),
                transparent: dotRgba.a < 1 || dotRgba.a === 0,
                opacity: dotRgba.a,
              }),
              dotCoordinates.length
            );
            const matrix = new Matrix4();
            dotCoordinates.forEach(([lng, lat], i) => {
              const p = latLngToPosition(lat, lng);
              matrix.makeScale(1, 1, 1);
              matrix.setPosition(p.x * globeRadius, p.y * globeRadius, p.z * globeRadius);
              instanced.setMatrixAt(i, matrix);
            });
            instanced.instanceMatrix.needsUpdate = true;
            dotInstances = instanced;
            globeGroup.add(dotInstances);
          }
        }

        updateMarkers();
        renderer.render(scene, camera);
        canvas.style.opacity = "1";
        canvas.style.visibility = "visible";
        setIsLoading(false);
      } catch {
        setError("Failed to load land map data");
        setIsLoading(false);
      }
    };

    const initialLongitudeRad = (initialLongitude * Math.PI) / 180;
    const initialLatitudeRad = (initialLatitude * Math.PI) / 180;
    const rotation = { x: initialLongitudeRad, y: initialLatitudeRad };
    const targetRotation = { x: initialLongitudeRad, y: initialLatitudeRad };
    const velocity = { x: 0, y: 0 };
    let isDragging = false;
    let isHovering = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animationFrameId: number | null = null;
    const lerpFactor = smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03);
    const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96);

    globeGroup.rotation.y = initialLongitudeRad;
    globeGroup.rotation.x = initialLatitudeRad;
    scene.add(globeGroup);
    globeGroup.add(oceanMesh);
    if (showGrid && graticuleColor && graticuleRgba.a > 0) globeGroup.add(graticuleGroup);
    globeGroup.add(continentOutlineGroup);

    const animate = () => {
      const threshold = 0.01;
      if (!isDragging && rotationSpeed !== 0 && (!stopOnHover || !isHovering)) {
        targetRotation.x += rotationSpeed * 0.01;
      }
      if (!isDragging && smoothingN > 0) {
        if (Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold) {
          targetRotation.x += velocity.x;
          targetRotation.y += velocity.y;
          targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
          velocity.x *= velocityDecay;
          velocity.y *= velocityDecay;
        } else {
          velocity.x = 0;
          velocity.y = 0;
        }
      }
      const dx = targetRotation.x - rotation.x;
      const dy = targetRotation.y - rotation.y;
      let needsRender = false;
      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold || rotationSpeed !== 0 || isDragging) {
        rotation.x += dx * lerpFactor;
        rotation.y += dy * lerpFactor;
        rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));
        needsRender = true;
      }
      if (needsRender || rotationSpeed !== 0 || isDragging) {
        globeGroup.rotation.y = rotation.x;
        globeGroup.rotation.x = rotation.y;
        renderer.render(scene, camera);
      }
      const hasVelocity = Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold;
      const hasLerpDelta = Math.abs(dx) > threshold || Math.abs(dy) > threshold;
      if (isDragging || rotationSpeed !== 0 || hasVelocity || hasLerpDelta) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        animationFrameId = null;
      }
    };

    const startAnimation = () => {
      if (animationFrameId === null) animationFrameId = requestAnimationFrame(animate);
    };
    if (rotationSpeed !== 0) startAnimation();

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      velocity.x = 0;
      velocity.y = 0;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      startAnimation();
      const onDragMove = (moveEvent: MouseEvent) => {
        const sensitivity = mapDragSpeedUiToSensitivity(dragSpeed);
        const dx = moveEvent.clientX - lastMouseX;
        const dy = moveEvent.clientY - lastMouseY;
        targetRotation.x += dx * sensitivity;
        targetRotation.y += dy * sensitivity;
        targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
        velocity.x = dx * sensitivity * 0.3;
        velocity.y = dy * sensitivity * 0.3;
        lastMouseX = moveEvent.clientX;
        lastMouseY = moveEvent.clientY;
      };
      const onDragEnd = () => {
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        isDragging = false;
      };
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onDragEnd);
    };
    canvas.addEventListener("mousedown", handleMouseDown);

    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      if (!stopOnHover) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      isHovering = raycaster.intersectObject(oceanMesh).length > 0;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || container.offsetWidth || 800;
      const h = container.clientHeight || container.offsetHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      camera.position.set(0, 0, 2.5 / scaleMultiplier);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    loadWorldData();

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [
    speed, smoothing, dots, fill, fillColor, allDots, density, dotSize, dotColor,
    scale, stopOnHover, markerConfig, direction, initialLatitude, initialLongitude,
    oceanColor, outlineColor, showOutline, graticuleColor, showGrid, outlineWidth,
    dragSpeed, detail, rotationSpeed, dotSpacing, dotSizeMultiplier,
    markerRadiusMultiplier, scaleMultiplier, gridWidth, smoothingN,
  ]);

  const containerStyle: CSSProperties = {
    ...style,
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Silent when it cannot draw — the layout must not show an error card.
  if (error) return <div style={containerStyle} aria-hidden />;

  return <div ref={containerRef} style={containerStyle} />;
}
