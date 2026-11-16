import { Suspense, lazy } from 'react';
import './ProjectsOrbit.css';

const ProjectsOrbit3D = lazy(() => import('./ProjectsOrbit3D'));

export default function ProjectsOrbit() {
  return (
    <section className="po" id="projects" aria-labelledby="po-title">
      <Suspense fallback={<div className="po3-canvas-wrap" />}>
        <ProjectsOrbit3D />
      </Suspense>

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
