import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>CAREER TRAJECTORY & COMPETITIVE PODIUMS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4"
          >
            Experience & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
              National Recognition
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          >
            Proven track record in high-pressure engineering sprints, enterprise software environments, and academic rigor.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l-2 border-slate-800 space-y-12">
          {EXPERIENCES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Orb */}
              <div
                className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full border-4 border-[#0B0F19] flex items-center justify-center transition-transform group-hover:scale-125 shadow-lg"
                style={{
                  backgroundColor: item.accentColor,
                  boxShadow: `0 0 16px ${item.accentColor}`,
                }}
              />

              {/* Timeline Card */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
                
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {item.role}
                    </h3>
                    <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2 mt-0.5">
                      {item.organization}
                    </h4>
                  </div>

                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: item.accentColor }}
                      />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
