import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';

function Tile({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className="w-[420px] h-[270px] rounded-2xl flex-shrink-0 flex items-end p-6 relative overflow-hidden"
      style={{ background: project.gradient }}
    >
      <img
        src={project.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%)' }} />
      <span className="relative text-white font-medium text-xl uppercase tracking-wide">{project.name}</span>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const value = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1 = projects.slice(0, 4);
  const row2 = projects.slice(4, 7);
  const row1Tripled = [...row1, ...row1, ...row1];
  const row2Tripled = [...row2, ...row2, ...row2];

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
        >
          {row1Tripled.map((p, i) => (
            <Tile key={`r1-${i}`} project={p} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
        >
          {row2Tripled.map((p, i) => (
            <Tile key={`r2-${i}`} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
