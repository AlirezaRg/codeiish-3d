import GothicHero from './components/GothicHero';
import ScrollVideoSection from './components/ScrollVideoSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import SystemMap from './components/SystemMap';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

function App() {
  return (
    <div style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <GothicHero />
      <ScrollVideoSection />
      <MarqueeSection />
      <AboutSection />
      <SystemMap />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default App;
