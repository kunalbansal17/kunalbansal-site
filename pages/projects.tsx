import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section>
      <h1 className="text-3xl font-semibold mb-2">Projects</h1>
      <p className="text-gray-700 mb-6">Below are some of my featured projects.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, idx) => (
          <ProjectCard key={idx} project={p} />
        ))}
      </div>
    </section>
  );
}
