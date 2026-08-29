import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Scene3D } from './components/3d/Scene3D';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';

import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScrollProgress(self.progress);

        if (self.progress < 0.20) {
          setActiveSection('hero');
        } else if (self.progress < 0.55) {
          setActiveSection('projects');
        } else if (self.progress < 0.78) {
          setActiveSection('skills');
        } else if (self.progress < 0.90) {
          setActiveSection('experience');
        } else {
          setActiveSection('contact');
        }
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070B14] text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Loading Sequence */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Persistent Dynamic Background Glows synced with scroll */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Ambient Orb */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 opacity-30"
          style={{
            backgroundColor:
              scrollProgress < 0.20
                ? '#8B5CF6'
                : scrollProgress < 0.55
                ? '#3B82F6'
                : scrollProgress < 0.78
                ? '#F59E0B'
                : scrollProgress < 0.90
                ? '#10B981'
                : '#EC4899',
          }}
        />

        {/* Bottom-Right Ambient Orb */}
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] transition-all duration-1000 opacity-25"
          style={{
            backgroundColor:
              scrollProgress < 0.20
                ? '#38BDF8'
                : scrollProgress < 0.55
                ? '#8B5CF6'
                : scrollProgress < 0.78
                ? '#EC4899'
                : scrollProgress < 0.90
                ? '#3B82F6'
                : '#8B5CF6',
          }}
        />

        {/* Subtle dynamic grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* 3D WebGL Canvas Scene (React Three Fiber + Drei) */}
      <Scene3D
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        activeProjectIndex={activeProjectIndex}
      />

      {/* Floating Glass Navigation Header */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main HTML Overlay / Content Stream */}
      <main className="relative z-10">
        <HeroSection onScrollTo={handleNavigate} />
        <ProjectsSection
          activeProjectIndex={activeProjectIndex}
          onSelectProject={setActiveProjectIndex}
        />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
