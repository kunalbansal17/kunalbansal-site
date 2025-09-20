type Project = {
  title: string;
  description: string;
  year: string;
  link?: string;
  image?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-sm transition bg-white">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-gray-500 text-sm">{project.year}</p>
        <p className="mt-2 text-gray-700 text-sm">{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline text-sm"
          >
            Visit
          </a>
        )}
      </div>
    </div>
  );
}
