import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Bot, BrainCircuit, Terminal, Award, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo }) => {
  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Typography & Info */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left z-10">
          {/* Engineering Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-6 w-fit backdrop-blur-md shadow-sm"
          >
            <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>AI / ML Engineer & Autonomous Systems</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </motion.div>

          {/* Main Name Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6"
          >
            Hi, I'm <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-amber-300">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Role & Bio */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8 max-w-2xl"
          >
            {PERSONAL_INFO.shortBio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={() => onScrollTo('projects')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <BrainCircuit className="w-4 h-4 text-purple-200 group-hover:rotate-45 transition-transform" />
              <span>Explore AI Systems</span>
            </button>

            <button
              onClick={() => onScrollTo('skills')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 text-slate-200 hover:text-white font-medium text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Tech Matrix & Stack</span>
            </button>
          </motion.div>

          {/* Live Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 max-w-2xl"
          >
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div key={i} className="flex flex-col p-3 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                <span className="text-xl sm:text-2xl font-display font-black text-white" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mt-0.5 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Floating Profile Card with 3D Soft Glow & Status */}
        <div className="lg:col-span-5 flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md"
          >
            {/* Ambient Background Gradient Halo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-amber-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

            {/* Main Glass Profile Card */}
            <div className="relative bg-slate-900/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              
              {/* Profile Image with Soft Glowing Ring */}
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-1 bg-gradient-to-tr from-purple-500 via-blue-500 to-amber-400 shadow-xl shadow-purple-500/20 mb-6 group">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 relative">
                  <img
                    src={`${import.meta.env.BASE_URL}profile.png`}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = `${import.meta.env.BASE_URL}image.png`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Status Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-950/95 border border-purple-500/40 text-[11px] font-mono text-purple-300 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>AI Intern & Researcher</span>
                </div>
              </div>

              {/* Card Meta & Badges */}
              <div className="space-y-3 pt-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    Sapthagiri NPS University
                  </span>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg font-bold">
                    {PERSONAL_INFO.cgpa}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-light px-2">
                  Focused on Generative AI, Multilingual Voice Agents, and High-Throughput Clinical Workflows.
                </p>

                {/* Highlight Badges */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-300 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-md">
                    <Award className="w-3 h-3 text-blue-400" /> HackMatrix 2.0 (2nd Place)
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md">
                    <Sparkles className="w-3 h-3 text-amber-400" /> SIH 2025 Finalist
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em]">Scroll To Explore</span>
        <button
          onClick={() => onScrollTo('projects')}
          className="p-2 rounded-full border border-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-colors animate-bounce"
          aria-label="Scroll Down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
