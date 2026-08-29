import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Database, Terminal, Sparkles } from 'lucide-react';
import { SKILL_GROUPS } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getCategoryIcon = (category: string) => {
    if (category.includes('AI')) return <Cpu className="w-4 h-4 text-purple-400" />;
    if (category.includes('Languages')) return <Code2 className="w-4 h-4 text-blue-400" />;
    if (category.includes('Full-Stack')) return <Terminal className="w-4 h-4 text-amber-400" />;
    return <Database className="w-4 h-4 text-pink-400" />;
  };

  const filteredGroups = selectedCategory === 'All'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter(g => g.category === selectedCategory);

  return (
    <section id="skills" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>TECHNICAL CAPABILITIES & PROFICIENCY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4"
          >
            Engineering Stack & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-300">
              Machine Learning Toolchain
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          >
            A cohesive balance between deep ML research frameworks, cloud infrastructure, and modern frontend engines.
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedCategory === 'All'
                  ? 'bg-white text-slate-950 font-bold shadow-lg'
                  : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {SKILL_GROUPS.map((group) => (
              <button
                key={group.category}
                onClick={() => setSelectedCategory(group.category)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  selectedCategory === group.category
                    ? 'bg-slate-900 border border-purple-500 text-white font-semibold shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {getCategoryIcon(group.category)}
                <span>{group.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/75 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: group.accent }}
              />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{ backgroundColor: `${group.accent}15`, borderColor: `${group.accent}40` }}
                >
                  {getCategoryIcon(group.category)}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{group.category}</h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {group.items.length} Core Modules
                  </span>
                </div>
              </div>

              {/* Skills List with Level Bars */}
              <div className="space-y-4">
                {group.items.map((skill) => {
                  const getPercent = (level: string) => {
                    if (level === 'Expert') return 95;
                    if (level === 'Advanced') return 88;
                    return 78;
                  };

                  const pct = getPercent(skill.level);

                  return (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-slate-200 font-medium flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: group.accent }}
                          />
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {skill.level}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: group.accent,
                            boxShadow: `0 0 10px ${group.accent}80`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
