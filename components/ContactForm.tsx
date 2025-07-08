"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create particle burst effect
    const button = e.currentTarget.querySelector('.submit-btn');
    if (button) {
      // Create particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-[#00f5c4] rounded-full pointer-events-none';
        particle.style.left = '50%';
        particle.style.top = '50%';
        button.appendChild(particle);

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => particle.remove()
        });
      }
    }

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-3xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none focus:border-[#00f5c4] focus:ring-0 text-lg py-3 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none focus:border-[#00f5c4] focus:ring-0 text-lg py-3 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="bg-transparent border-2 border-gray-600 rounded-xl focus:border-[#00f5c4] focus:ring-0 text-lg resize-none transition-all duration-300"
            />
          </div>

          <Button
            type="submit"
            className="submit-btn relative w-full bg-gradient-to-r from-[#00f5c4] to-[#a259ff] text-black font-semibold text-lg py-4 rounded-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Launch Message
              <Sparkles className="w-5 h-5" />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}