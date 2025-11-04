import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

export const ProjectCard = ({ title, description, tags, image, link }: ProjectCardProps) => {
  const CardContent = () => (
    <div className="group relative rounded-xl border border-border card-hover cursor-pointer h-full overflow-visible shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto">
      <div className="w-full bg-muted relative rounded-xl overflow-hidden" style={{ aspectRatio: '21/9' }}>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Tags in top right corner of project box */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end max-w-[60%]">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs rounded-full bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200 font-medium shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Title box - centered at bottom with overhang */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-6 py-3 shadow-md flex items-center gap-2 whitespace-nowrap">
        <h3 className="text-2xl font-serif font-extrabold text-gray-900">{title}</h3>
        {link && (
          <ExternalLink className="h-5 w-5 text-gray-700 transition-colors group-hover:text-gray-900 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  if (link) {
    // Check if it's an internal link (starts with /)
    if (link.startsWith('/')) {
      return (
        <Link to={link} className="block h-full">
          <CardContent />
        </Link>
      );
    }
    
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
};
