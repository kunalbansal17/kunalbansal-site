import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="mt-6 grid gap-4">
        {projects.map((p, idx) => <ProjectCard key={idx} project={p} />)}
      </div>
    </section>
  );
}
