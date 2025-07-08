"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Coffee, Zap } from 'lucide-react';

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create animated stars in footer
    const starsContainer = starsRef.current;
    if (starsContainer) {
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'absolute w-1 h-1 bg-[#00f5c4] rounded-full opacity-60';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);

        // Animate twinkling
        gsap.to(star, {
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 1.5 + 0.5,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2
        });
      }
    }

    // Footer entrance animation
    gsap.fromTo(footerRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%'
      }
    });

    return () => {
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: 0 },
      ease: "power3.inOut"
    });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Jayanthmurala", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jayanth-murala-0045b2281", label: "LinkedIn" },
    { icon: Mail, href: "mailto:jayanthmurala1@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ];

  const stats = [
    { icon: Code, label: "Lines of Code", value: "100K+" },
    { icon: Coffee, label: "Cups of Coffee", value: "∞" },
    { icon: Zap, label: "Ideas per Day", value: "42" }
  ];

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-t from-[#0a0d14] to-transparent border-t border-gray-800/50 overflow-hidden">
      {/* Animated stars background */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Aurora effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f5c4] rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#a259ff] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <div className="aurora-text text-3xl font-bold mb-4">Jayanth Murala</div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Crafting digital experiences that push the boundaries of what&#39;s possible. 
              Let&#39;s build something extraordinary together.
            </p>
            
            {/* Fun stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center glass-effect rounded-xl p-3">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-[#00f5c4]" />
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 glow-text">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00f5c4] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#00f5c4] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6 glow-text">Connect</h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-[#00f5c4] transition-all duration-300 group"
                >
                  <div className="p-2 rounded-full glass-effect group-hover:bg-[#00f5c4] group-hover:bg-opacity-20 transition-all duration-300">
                    <social.icon className="w-4 h-4" />
                  </div>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="mt-8 flex items-center space-x-2 px-4 py-2 glass-effect rounded-full hover:bg-[#00f5c4] hover:bg-opacity-20 transition-all duration-300 group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and lots of</span>
              <Coffee className="w-4 h-4 text-[#00f5c4]" />
            </div>
            
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Jayanth Murala. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Built with Next.js & GSAP</span>
              <span>•</span>
              <span>Deployed on Vercel</span>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-[#00f5c4]/20 rounded-full floating opacity-30" />
        <div className="absolute bottom-20 left-10 w-16 h-16 border border-[#a259ff]/20 rounded-full floating opacity-20" style={{ animationDelay: '2s' }} />
      </div>
    </footer>
  );
}