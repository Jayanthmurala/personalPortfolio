"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { toast } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: 'Project Inquiry', company: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="relative group">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none focus:border-[#00f5c4] focus:ring-0 text-lg py-3 transition-all duration-300"
            />
            <label className="absolute -top-6 left-0 text-xs font-bold uppercase tracking-widest text-[#00f5c4] opacity-70">
              Full Name
            </label>
          </div>

          <div className="relative group">
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none focus:border-[#00f5c4] focus:ring-0 text-lg py-3 transition-all duration-300"
            />
            <label className="absolute -top-6 left-0 text-xs font-bold uppercase tracking-widest text-[#00f5c4] opacity-70">
              Email Address
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange as any}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 rounded-none focus:border-[#00f5c4] focus:ring-0 text-lg py-3 transition-all duration-300 appearance-none text-gray-300 cursor-pointer group-hover:border-gray-400"
              >
                <option value="Project Inquiry" className="bg-[#0a0d14] text-white py-2">Project Inquiry</option>
                <option value="Job Opportunity" className="bg-[#0a0d14] text-white py-2">Job Opportunity</option>
                <option value="Collaboration" className="bg-[#0a0d14] text-white py-2">Collaboration</option>
                <option value="Just Saying Hi" className="bg-[#0a0d14] text-white py-2">Just Saying Hi</option>
                <option value="Other" className="bg-[#0a0d14] text-white py-2">Other</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#00f5c4] transition-colors duration-300">
                <ChevronDown className="w-5 h-5" />
              </div>
              <label className="absolute -top-6 left-0 text-xs font-bold uppercase tracking-widest text-[#00f5c4] opacity-70 group-hover:opacity-100 transition-opacity">
                Select Subject
              </label>
            </div>

            <div className="relative group">
              <Input
                type="text"
                name="company"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={handleChange}
                className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none focus:border-[#00f5c4] focus:ring-0 text-lg py-3 transition-all duration-300"
              />
              <label className="absolute -top-6 left-0 text-xs font-bold uppercase tracking-widest text-[#00f5c4] opacity-70">
                Organization
              </label>
            </div>
          </div>

          <div className="relative">
            <Textarea
              name="message"
              placeholder="Tell me more about your ideas..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-transparent border-2 border-gray-600 rounded-xl focus:border-[#00f5c4] focus:ring-0 text-lg resize-none transition-all duration-300"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn relative w-full bg-gradient-to-r from-[#00f5c4] to-[#a259ff] text-black font-semibold text-lg py-4 rounded-xl hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Launching...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Launch Message
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}