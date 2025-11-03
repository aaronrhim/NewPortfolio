import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

export const ProjectCard = ({ title, description, tags, image, link }: ProjectCardProps) => {
  const CardContent = () => (
    <div className="group relative bg-card rounded-xl  border border-border card-hover cursor-pointer">
      {image && (
        <div className="aspect-video w-full  bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-serif font-bold">{title}</h3>
          {link && (
            <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
          )}
        </div>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
};
