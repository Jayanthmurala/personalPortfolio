const SOFTWARE = /swiftshader|llvmpipe|software|basic render/i;

/**
 * True only when WebGL is available *and* backed by real hardware. A software
 * rasteriser will happily hand back a context and then run a fluid sim at
 * ~2fps, which is worse than not drawing it at all.
 *
 * Fails open: when the browser masks the renderer name for privacy we assume
 * hardware, so this only ever rules out a renderer that identifies itself.
 */
export function hasFastWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const opts = { failIfMajorPerformanceCaveat: true };
    const gl = (canvas.getContext("webgl2", opts) ||
      canvas.getContext("webgl", opts)) as WebGLRenderingContext | null;
    if (!gl) return false;

    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";

    // the probe served its purpose; don't hold a context open
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    return !SOFTWARE.test(name);
  } catch {
    return false;
  }
}
