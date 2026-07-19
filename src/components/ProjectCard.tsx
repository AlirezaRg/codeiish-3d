import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2 } from 'lucide-react';
import type { Project } from '../data/projects';
import GhostButton from './GhostButton';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectCard({ project, index, total }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh] flex items-start justify-center sticky" style={{ top: `${96 + index * 28}px` }}>
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-6 md:mb-10">
          <span
            className="hero-heading font-black leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[#c9b8ff] uppercase tracking-widest text-xs sm:text-sm">{project.category}</span>
            <h3 className="text-white font-medium uppercase" style={{ fontSize: 'clamp(1.2rem, 3vw, 2.4rem)' }}>
              {project.name}
            </h3>
          </div>
          <div className="ml-auto">
            <GhostButton href={project.link ?? '#'} label={project.link ? 'View on GitHub' : 'Client Project'} />
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4 w-[40%]">
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center px-4 text-center"
              style={{ background: project.gradient, height: 'clamp(130px, 16vw, 230px)' }}
            >
              <span className="text-white/90 text-xs sm:text-sm uppercase tracking-wide">
                {project.tags.slice(0, 2).join(' · ')}
              </span>
            </div>
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center px-4 text-center"
              style={{ background: project.gradient, height: 'clamp(160px, 22vw, 340px)' }}
            >
              <span className="text-white/70 text-xs sm:text-sm leading-relaxed">{project.type}</span>
            </div>
          </div>
          <div
            className="relative w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex flex-col items-center justify-end gap-4 p-6 text-center"
          >
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(12,12,12,0.1) 30%, rgba(12,12,12,0.92) 100%)' }}
            />
            <Code2 className="relative w-10 h-10 sm:w-14 sm:h-14 text-white/80" strokeWidth={1.25} />
            <p className="relative text-white/85 text-sm sm:text-base max-w-md leading-relaxed">{project.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
