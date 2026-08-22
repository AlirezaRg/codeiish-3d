import './ProjectsOrbit.css';
import ProjectsOrbit3D from './ProjectsOrbit3D';

export default function ProjectsOrbit() {
  return (
    <section className="po" id="projects" aria-labelledby="po-title">
      <ProjectsOrbit3D />

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
