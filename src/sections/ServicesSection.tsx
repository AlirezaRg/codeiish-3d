import FadeIn from '../components/FadeIn';

const services = [
  {
    number: '01',
    name: 'Backend & Infrastructure',
    description:
      'REST APIs, background workers, and Linux servers built with Python, Flask and Django — designed to keep running quietly, unattended, after the demo is over.',
  },
  {
    number: '02',
    name: 'ERP & Hardware Bridges',
    description:
      'Connecting physical devices and Odoo 18 ERP over WebSocket — biometric check-ins, inventory sync, and anything that needs two systems that were never meant to talk to each other.',
  },
  {
    number: '03',
    name: 'Automation & AI Tooling',
    description:
      'Desktop assistants and coding tools built on top of Claude Code CLI — if a task repeats twice, it probably shouldn’t need a human anymore.',
  },
  {
    number: '04',
    name: 'Linux Administration',
    description:
      'Debian administration, systemd services, Nginx, and deployment pipelines — comfortable living in the terminal, keeping things reliable.',
  },
  {
    number: '05',
    name: 'E-commerce & Web Apps',
    description:
      'Full-stack Django applications — product catalogs, payment gateways, and admin panels, including full RTL support for Persian users.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="work"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          What I Build
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={20}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(12,12,12,0.15)' : 'none' }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 pt-2 sm:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
