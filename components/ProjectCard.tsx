type Project = {
  title: string;
  description: string;
  link?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border p-4 hover:shadow-sm transition">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{project.description}</p>
      {project.link && (
        <a href={project.link} className="mt-2 inline-block text-sm underline">
          View Project
        </a>
      )}
    </div>
  );
}
