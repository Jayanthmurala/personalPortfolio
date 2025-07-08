"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { Navbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillStar } from "@/components/SkillStar";
import { ContactForm } from "@/components/ContactForm";
import { FloatingElements } from "@/components/FloatingElements";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Footer } from "@/components/Footer";

import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import Image from "next/image";

import projects from "@/Data/projects";
import skills from "@/Data/skills";
import stats from "@/Data/stats";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTitle = heroRef.current?.querySelector(".hero-title");
      const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
      const heroDescription =
        heroRef.current?.querySelector(".hero-description");

      if (heroTitle && heroSubtitle && heroDescription) {
        const titleText = heroTitle.textContent || "";
        const subtitleText = heroSubtitle.textContent || "";

        heroTitle.innerHTML = titleText
          .split("")
          .map(
            (char) =>
              `<span class="inline-block opacity-0 transform translate-y-10">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");

        heroSubtitle.innerHTML = subtitleText
          .split("")
          .map(
            (char) =>
              `<span class="inline-block opacity-0 transform translate-y-10">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");

        gsap.to(heroTitle.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 3,
        });

        gsap.to(heroSubtitle.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)",
          delay: 3.8,
        });

        gsap.fromTo(
          heroDescription,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 4.5,
          }
        );
      }

      gsap.fromTo(
        ".about-text",
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 85%",
          },
        }
      );

      const projectCards = gsap.utils.toArray(".project-island");
      projectCards.forEach((card) => {
        gsap.fromTo(
          card as Element,
          {
            opacity: 0,
            scale: 0.8,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card as Element,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(
        ".skill-star",
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.to(".aurora-text", {
        backgroundPosition: "200% 50%",
        duration: 3,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <LoadingScreen />
      <main className="relative min-h-screen overflow-hidden">
        <BackgroundGrid />
        <FloatingElements />
        <AnimatedCursor />
        <Navbar />

        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="relative h-screen flex items-center justify-center"
        >
          <ParticleCanvas />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 glow-text">
              Jayanth Murala
            </h1>
            <h2 className="hero-subtitle text-2xl md:text-4xl font-light mb-8 glow-text-purple">
              Full Stack Developer
            </h2>
            <p className="hero-description text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Full-stack developer passionate about building intelligent,
              scalable, and modern web applications. Experienced in crafting
              real-world solutions using AI, cloud, and microservices — driven
              by curiosity and code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
           <a 
  href="/Jayanth_Murala_Resume.pdf" 
  target="_blank" 
  rel="noopener noreferrer"
  className="px-8 py-4 bg-gradient-to-r from-[#00f5c4] to-[#a259ff] text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
>
  <Download className="w-5 h-5" />
  View Resume
</a>
                <button
                className="px-8 py-4 glass-effect border border-[#00f5c4] text-[#00f5c4] font-semibold rounded-full hover:bg-[#00f5c4] hover:text-black transition-all duration-300"
                onClick={() => {
                  projectsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                >
                View My Work
                </button>
            </div>

            <div className="flex gap-6 justify-center">
              <a
                href="https://github.com/Jayanthmurala"
                className="p-4 rounded-full glass-effect hover:bg-[#00f5c4] hover:bg-opacity-20 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/jayanth-murala-0045b2281"
                className="p-4 rounded-full glass-effect hover:bg-[#00f5c4] hover:bg-opacity-20 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:jayanthmurala1@gmail.com"
                className="p-4 rounded-full glass-effect hover:bg-[#00f5c4] hover:bg-opacity-20 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#00f5c4]" />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={aboutRef}
          className="py-32 px-8 max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT - Content */}
            <div className="space-y-6 relative z-10 order-2 md:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-white glow-text mb-4">
                About Me
              </h3>

              <p className="about-text text-gray-300 leading-relaxed">
                I&apos;m <strong>Jayanth Murala</strong>, a full-stack developer
                and ECE undergrad based in India. I specialize in building
                scalable web apps using modern frameworks like{" "}
                <strong>React, Node.js, and Next.js</strong>.
              </p>
              <p className="about-text text-gray-300 leading-relaxed">
                My journey includes an internship at{" "}
                <strong>Bharat Electronics Limited (BEL)</strong>, where I
                helped reduce system defects by 10%. I&apos;ve also placed in
                national hackathons like <strong>WAVE-VIT</strong> and{" "}
                <strong>TechSprout</strong>.
              </p>
              <p className="about-text text-gray-300 leading-relaxed">
                From AI-driven platforms like an{" "}
                <strong>AI Career Coach</strong> to full-stack microservice
                apps, I love turning complex ideas into smooth, interactive
                experiences.
              </p>

              <div className="mt-6 p-4 border-l-4 border-[#00f5c4] bg-black/40 rounded-md text-sm text-[#00f5c4] italic">
                &quot;Code isn&apos;t just logic—it&apos;s expression. I believe
                in engineering experiences, not just interfaces.&quot;
              </div>
            </div>

            {/* RIGHT - Avatar */}
            <div className="relative flex justify-center items-center order-1 md:order-2">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#00f5c4]/20 to-[#a259ff]/20 blur-2xl z-0"></div>
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#00f5c4] to-[#a259ff] p-1 shadow-xl relative z-10">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="https://ik.imagekit.io/jayanthmurala05/ChatGPT_Image_Mar_30__2025__05_06_26_PM-removebg-preview.png?updatedAt=1751966158471"
                    alt="Jayanth Murala Avatar"
                    fill
                    className="object-contain scale-110 hover:scale-125 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 glow-text">
              The Project&apos;s
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 glow-text">
              The Skills&apos;
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <SkillStar key={index} skill={skill} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-32 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 aurora-text">
              Let&apos;s Connect
            </h2>
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
