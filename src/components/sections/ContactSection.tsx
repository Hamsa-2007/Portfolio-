import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentStatus, setSentStatus] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setSentStatus(true);
    setTimeout(() => {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Collaboration with ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}`;
      setSentStatus(false);
    }, 1000);
  };

  return (
    <section id="contact" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4"
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>LET'S BUILD SOMETHING EXTRAORDINARY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-4"
          >
            Have an AI Challenge? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-amber-300">
              Let's Bring It To Life.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          >
            Open to full-time engineering roles, AI/ML research collaborations, and innovative product development.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Connect Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-xs text-slate-400 mb-6 font-light">
                Feel free to email directly or reach out via LinkedIn.
              </p>

              {/* Copy Email Button */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between mb-6 group">
                <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-200 truncate">{PERSONAL_INFO.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 transition-all hover:scale-105 active:scale-95 shrink-0"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono">LinkedIn Profile</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-blue-400 transition-colors">↗</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono">GitHub Repositories</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors">↗</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Typically responds within 24 hours</span>
            </div>
          </motion.div>

          {/* Right Column: Quick Dispatch Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <h3 className="text-xl font-display font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs text-slate-400 mb-6 font-light">
              Submit your inquiry or project details below:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Project / Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your AI project, research idea, or role..."
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sentStatus}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {sentStatus ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Preparing Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-purple-200" />
                    <span>Dispatch Transmission</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>

      {/* Footer Branding */}
      <footer className="w-full max-w-7xl mx-auto pt-16 pb-4 border-t border-slate-800/60 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span>© 2026 {PERSONAL_INFO.name}</span>
          <span>•</span>
          <span>AI / ML Engineer</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Designed with Three.js & Neural WebGL</span>
        </div>
      </footer>
    </section>
  );
};
