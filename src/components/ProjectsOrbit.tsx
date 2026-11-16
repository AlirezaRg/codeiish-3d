import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './ProjectsOrbit.css';

const ProjectsOrbit3D = lazy(() => import('./ProjectsOrbit3D'));

/**
 * The 3D scene is expensive to initialize (three.js + postprocessing), so it
 * only mounts once the section is actually near the viewport — not on initial
 * page load — to keep it off the critical path for Core Web Vitals (TBT/LCP).
 */
export default function ProjectsOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="po" id="projects" aria-labelledby="po-title" ref={sectionRef}>
      {shouldMount ? (
        <Suspense fallback={<div className="po3-canvas-wrap" />}>
          <ProjectsOrbit3D />
        </Suspense>
      ) : (
        <div className="po3-canvas-wrap" />
      )}

      <div className="po-head">
        <p className="po-eyebrow">05 / PROJECTS</p>
        <h2 className="po-title" id="po-title">
          AlirezaRg Builds
        </h2>
      </div>

      <p className="po-hint">DRAG TO ROTATE · SCROLL TO ZOOM · CLICK A NODE TO OPEN IT ON GITHUB</p>
    </section>
  );
}
