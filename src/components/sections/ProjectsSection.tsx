import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Bot, Check, ArrowRight, Stethoscope, Mic, Sprout, ShieldAlert, Cpu } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';
import { GithubIcon } from '../icons/BrandIcons';

interface ProjectsSectionProps {
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeProjectIndex,
  onSelectProject
}) => {
  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <Stethoscope className="w-4 h-4" />;
      case 'voice':
        return <Mic className="w-4 h-4" />;
      case 'agriculture':
        return <Sprout className="w-4 h-4" />;
      case 'forensics':
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section id="projects" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>PRODUCTION SYSTEMS & RESEARCH WORK</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight"
            >
              Autonomous AI Systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-amber-300">
                Crafted for High-Stakes Domains
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Project Cards Grid (5 Distinct AI Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project: Project, idx: number) => {
            const isHovered = activeProjectIndex === idx;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => onSelectProject(idx)}
                className={`group relative rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl ${
                  isHovered
                    ? 'bg-slate-900/90 border-white/25 scale-[1.02] shadow-purple-500/10'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Background Ambient Glow tailored to project accent */}
                <div
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{ backgroundColor: project.accentColor }}
                />

                {/* Top Accent Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: project.accentColor }}
                />

                {/* Top Row: ID, Category & Agent Role */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-2xl font-display font-black tracking-tight"
                        style={{ color: project.accentColor }}
                      >
                        {project.number}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate max-w-[130px]">
                        {project.category}
                      </span>
                    </div>

                    {/* Agent Pill */}
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md shrink-0"
                      style={{
                        backgroundColor: `${project.accentColor}15`,
                        borderColor: `${project.accentColor}40`,
                        color: project.secondaryColor,
                      }}
                    >
                      {getProjectIcon(project.iconType)}
                      <span className="truncate max-w-[110px]">{project.agentRole}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-white transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p
                    className="text-xs font-mono mb-3 font-medium line-clamp-1"
                    style={{ color: project.secondaryColor }}
                  >
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-5 line-clamp-3">
                    {project.desc}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 mb-5">
                    {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-300 font-light">
                        <Check
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: project.accentColor }}
                        />
                        <span className="line-clamp-2">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Tech Stack & Action Links */}
                <div className="pt-4 border-t border-slate-800/80">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-slate-300 bg-slate-950/70 border border-slate-800 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 shadow-sm transition-all hover:scale-105"
                          style={{ borderColor: `${project.accentColor}50` }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live</span>
                        </a>
                      )}

                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 transition-all hover:scale-105"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectProject(idx)}
                      className="text-xs font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      style={{ color: project.accentColor }}
                    >
                      <span>Focus 3D</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
