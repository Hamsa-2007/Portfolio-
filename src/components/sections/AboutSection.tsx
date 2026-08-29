import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Layers, Network, Sparkles, Workflow, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onSelectLayer?: (layerIndex: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectLayer }) => {
  const [activeLayerTab, setActiveLayerTab] = useState<number>(0);

  const layers = [
    {
      index: 0,
      title: "Input Layer",
      color: "#3B82F6",
      bgBadge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      icon: Network,
      tag: "Feature Extraction",
      desc: "Multimodal ingestion of voice streams, doctor shift reports, agricultural telemetry, and cyber forensic PDFs.",
      technologies: ["Twilio Voice Stream", "PDF Forensic Parsers", "Gemini API Ingestion", "IoT Telemetry"]
    },
    {
      index: 1,
      title: "Hidden Layer (Encoders & Attention)",
      color: "#8B5CF6",
      bgBadge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: Layers,
      tag: "Deep Representation",
      desc: "Dense transformer embeddings, self-attention matrices, and contextual weighting to synthesize raw domain data into structured representations.",
      technologies: ["PyTorch / Transformers", "Vector Embeddings", "Groq Llama-3 Acceleration", "LangChain Chains"]
    },
    {
      index: 2,
      title: "Hidden Layer (Multi-Agent Logic)",
      color: "#C084FC",
      bgBadge: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      icon: Workflow,
      tag: "Agent Orchestration",
      desc: "Autonomous multi-agent verification, safety risk matrix categorization, cross-lingual translation, and predictive yield modeling.",
      technologies: ["Autonomous Multi-Agents", "Prisma ORM", "Supabase Edge Logic", "Safety Incident Classifiers"]
    },
    {
      index: 3,
      title: "Output Layer (Action & Delivery)",
      color: "#F59E0B",
      bgBadge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: Cpu,
      tag: "Actionable Impact",
      desc: "Delivering real-time clinical handover summaries, multilingual patient adherence calls, and optimized agricultural guidance.",
      technologies: ["React 19 Dashboard", "Live Voice Response", "Automated Triage Reports", "Farmer Mobile Portal"]
    }
  ];

  const handleTabClick = (idx: number) => {
    setActiveLayerTab(idx);
    if (onSelectLayer) onSelectLayer(idx);
  };

  return (
    <section id="about" className="min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono mb-4"
          >
            <BrainCircuit className="w-4 h-4 text-blue-400" />
            <span>NEURAL ARCHITECTURE & METHODOLOGY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4"
          >
            Engineering Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300">
              From Weights to Real-World Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          >
            I build end-to-end AI systems. Instead of treating machine learning as a black box, I architect every tier — from data ingestion pipelines and latent representations to low-latency agent execution and intuitive user interfaces.
          </motion.p>
        </div>

        {/* Interactive Neural Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Layer Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <span>Interactive Pipeline Inspector</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </h3>

            {layers.map((layer) => {
              const isSelected = activeLayerTab === layer.index;
              const IconComp = layer.icon;

              return (
                <motion.div
                  key={layer.index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: layer.index * 0.1 }}
                  onClick={() => handleTabClick(layer.index)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-900/90 border-purple-500/60 shadow-xl shadow-purple-500/15 scale-[1.02]'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{ backgroundColor: `${layer.color}15`, borderColor: `${layer.color}40` }}
                      >
                        <IconComp className="w-4 h-4" style={{ color: layer.color }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{layer.title}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">{layer.tag}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${layer.bgBadge}`}>
                      Stage 0{layer.index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Layer Deep-Dive Focus Panel */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeLayerTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Layer Top Accent Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: layers[activeLayerTab].color }}
              />

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${layers[activeLayerTab].bgBadge}`}>
                    {layers[activeLayerTab].tag.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-3">
                    {layers[activeLayerTab].title}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {React.createElement(layers[activeLayerTab].icon, {
                    className: 'w-6 h-6',
                    style: { color: layers[activeLayerTab].color }
                  })}
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                {layers[activeLayerTab].desc}
              </p>

              {/* Technologies in this layer */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Technologies & Tooling:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {layers[activeLayerTab].technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-world Application Note */}
              <div className="mt-6 p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-3 text-xs text-purple-200">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Architecture Note:</strong> Synced with the 3D WebGL Neural Graph in the background — watch nodes light up in real time as data pulses through the layers.
                </span>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
