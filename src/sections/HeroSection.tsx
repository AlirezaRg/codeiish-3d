import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import Navbar from '../components/Navbar';
import HeroPortrait from '../components/HeroPortrait';
import FitText from '../components/FitText';

export default function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip' }}
    >
      <Navbar />

      <div className="flex-1 flex flex-col justify-center overflow-hidden px-6 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <FitText className="hero-heading font-black uppercase tracking-tight leading-none text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            hi, i&apos;m alireza
          </FitText>
        </FadeIn>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a backend engineer driven by building systems that quietly keep working
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        className="absolute right-6 md:right-10 z-10 top-[54%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-24 md:bottom-28 w-[200px] sm:w-[260px] md:w-[300px] lg:w-[340px]"
      >
        <Magnet padding={150} strength={3}>
          <HeroPortrait />
        </Magnet>
      </FadeIn>
    </section>
  );
}
