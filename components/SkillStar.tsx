"use client";

import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillStarProps {
  skill: Skill;
}

export function SkillStar({ skill }: SkillStarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: '#00f5c4',
      backend: '#a259ff',
      language: '#ff6b6b',
      database: '#4ecdc4',
      animation: '#45b7d1',
      styling: '#f9ca24',
      devops: '#f0932b',
      cloud: '#eb4d4b'
    };
    return colors[category as keyof typeof colors] || '#00f5c4';
  };

  return (
    <div 
      className="skill-star relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 pulse-glow"
        style={{
          background: `radial-gradient(circle, ${getCategoryColor(skill.category)}20 0%, transparent 70%)`,
          border: `2px solid ${getCategoryColor(skill.category)}`,
          boxShadow: isHovered ? `0 0 30px ${getCategoryColor(skill.category)}60` : `0 0 10px ${getCategoryColor(skill.category)}30`,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)'
        }}
      >
        {skill.name.charAt(0)}
      </div>
      
      <div 
        className={`mt-3 text-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <div className="text-sm font-semibold text-white">{skill.name}</div>
        <div className="text-xs text-gray-400 capitalize">{skill.category}</div>
        <div className="w-12 h-1 bg-gray-700 rounded-full mt-2 mx-auto overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: isHovered ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${getCategoryColor(skill.category)}, ${getCategoryColor(skill.category)}80)`
            }}
          />
        </div>
      </div>
    </div>
  );
}