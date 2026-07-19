import { Terminal, Cpu, GitBranch, Server } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

function CornerIcon({
  Icon,
  position,
  delay,
  x,
}: {
  Icon: typeof Terminal;
  position: string;
  delay: number;
  x: number;
}) {
  return (
    <FadeIn delay={delay} x={x} y={0} duration={0.9} className={`absolute ${position} hidden sm:block`}>
      <div
        className="w-[100px] sm:w-[130px] md:w-[160px] aspect-square rounded-full flex items-center justify-center border border-white/10"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.18), rgba(12,12,12,0) 70%)' }}
      >
        <Icon className="w-1/3 h-1/3 text-[#c9b8ff]" strokeWidth={1.25} />
      </div>
    </FadeIn>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      <CornerIcon Icon={Terminal} position="top-[4%] left-[1%] sm:left-[2%] md:left-[4%]" delay={0.1} x={-80} />
      <CornerIcon Icon={Server} position="bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]" delay={0.25} x={-80} />
      <CornerIcon Icon={Cpu} position="top-[4%] right-[1%] sm:right-[2%] md:right-[4%]" delay={0.15} x={80} />
      <CornerIcon Icon={GitBranch} position="bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]" delay={0.3} x={80} />

      <div className="flex flex-col items-center text-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            text="Backend developer, Linux administrator, and someone who'd rather automate a problem than repeat it. I focus on Python services, Odoo/ERP integrations, and hardware bridges that keep running quietly, unattended. Let's build something dependable together."
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
