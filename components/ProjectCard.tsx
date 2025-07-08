"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-island relative group p-4 transform transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-3xl overflow-hidden glass-effect shadow-xl h-full flex flex-col justify-between transition-all duration-500">
        {/* Project Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80`;
            }}
            unoptimized={project.image.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        </div>

        {/* Project Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-bold mb-2 glow-text text-white">{project.title}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-[#00f5c4] to-[#a259ff] text-black font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto pt-2 flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 glass-effect border-[#00f5c4] hover:bg-[#00f5c4] hover:text-black transition-all duration-300"
                >
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect border-[#00f5c4] max-w-2xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl glow-text text-white">{project.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={256}
                    className="w-full h-64 object-cover rounded-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80`;
                    }}
                    unoptimized={project.image.startsWith("http")}
                  />
                  <p className="text-gray-300 text-md leading-relaxed">
                    {project.description}. This project demonstrates advanced development techniques,
                    smooth animations, and a sleek, responsive interface.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-[#00f5c4] to-[#a259ff] text-black font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#00f5c4] to-[#a259ff] text-black hover:opacity-90"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    {project.github && (
                      <Button
                        variant="outline"
                        asChild
                        className="glass-effect border-[#a259ff] hover:bg-[#a259ff] hover:text-black"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
