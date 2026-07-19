import { Mail } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 text-center">
      <FadeIn delay={0} y={30}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>
          Work with Codeiish
        </h2>
        <p className="text-[#D7E2EA]/70 max-w-xl mx-auto mb-10" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}>
          Have a backend, Odoo, or hardware-integration project in mind? Or just want to talk Linux and AI tooling? I'm open to new work and good conversations.
        </p>
        <div className="flex justify-center mb-10">
          <ContactButton href="mailto:alirezarogni@gmail.com" label="alirezarogni@gmail.com" />
        </div>
        <div className="flex justify-center gap-6 text-[#D7E2EA]/60">
          <a href="https://github.com/AlirezaRg" target="_blank" rel="noopener noreferrer" className="hover:text-[#D7E2EA] transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/alireza-rogni" target="_blank" rel="noopener noreferrer" className="hover:text-[#D7E2EA] transition-colors">
            LinkedIn
          </a>
          <a href="mailto:alirezarogni@gmail.com" className="hover:text-[#D7E2EA] transition-colors flex items-center gap-2">
            <Mail className="w-5 h-5" /> Email
          </a>
        </div>
      </FadeIn>
      <p className="text-[#D7E2EA]/30 text-xs mt-20">© {new Date().getFullYear()} Codeiish — Alireza Rogni</p>
    </section>
  );
}
