import FadeIn from './FadeIn';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <FadeIn delay={0} y={-20} className="w-full">
      <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </FadeIn>
  );
}
