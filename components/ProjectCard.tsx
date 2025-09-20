type Project = {
  title: string;
  description: string;
  year: string;
  pageLink?: string;
  githubLink?: string;
  image?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded-lg bg-white hover:shadow-sm transition flex flex-row relative">
      {/* Year top-right */}
      <span className="absolute top-2 right-3 text-xs text-gray-500">
        {project.year}
      </span>

      {/* Left-side image */}
      {project.image && (
        <div className="w-32 h-32 flex-shrink-0 bg-gray-50">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Right-side text */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-gray-700 text-sm min-h-[100px]">
          {project.description}
        </p>

        <div className="mt-3 flex gap-2">
          {project.pageLink && (
            <a
              href={project.pageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md border border-blue-600 text-blue-600 text-sm hover:bg-blue-600 hover:text-white transition"
            >
              Visit Now
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md border border-blue-600 text-blue-600 text-sm hover:bg-blue-600 hover:text-white transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
