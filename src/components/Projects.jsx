import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description:
      "A landing page for a SaaS product built with React and Tailwind CSS. The landing page is fully responsive and includes animations and interactive elements using React Spring and Framer Motion.",
    image: "/projects/project1.png",
    tags: ["React", "Tailwind", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "SaaS Landing Page",
    description:
      "A landing page for a SaaS product built with React and Tailwind CSS. The landing page is fully responsive and includes animations and interactive elements using React Spring and Framer Motion.",
    image: "/projects/project2.png",
    tags: ["React", "Tailwind", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    description:
      "A landing page for a SaaS product built with React and Tailwind CSS. The landing page is fully responsive and includes animations and interactive elements using React Spring and Framer Motion.",
    image: "/projects/project3.png",
    tags: ["React", "Tailwind", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="ext-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>

                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/tatavarthiv"
            target="blank"
            className="cosmic-button flex items-center mx-auto gap-2 w-fit"
          >
            Check my Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
