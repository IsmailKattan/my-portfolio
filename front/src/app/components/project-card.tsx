import { useTranslation } from 'react-i18next';
import { Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Project } from '../../services/api';

// Helper function to strip markdown and get plain text preview
function stripMarkdown(markdown: string): string {
  if (!markdown) return '';
  return markdown
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove headers
    .replace(/#{1,6}\s/g, '')
    // Remove bold/italic
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove blockquotes
    .replace(/^>\s?/gm, '')
    // Remove horizontal rules
    .replace(/^(---|___|\*\*\*)$/gm, '')
    // Remove extra whitespace
    .replace(/\n+/g, ' ')
    .trim();
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#151933] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 hover:shadow-[#00d4ff]/20 transition-all"
    >
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#1e2443] to-[#151933]">
        <img
          src={project.cover_image || 'https://via.placeholder.com/800x600?text=No+Image'}
          alt={project.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div
        className="p-6"
        lang={project.content_language}
        dir={project.content_language === 'ar' ? 'rtl' : 'ltr'}
      >
        <h3 className="text-xl mb-2 text-gray-900 dark:text-[#e4e7f1]">{project.name}</h3>
        
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-[#00d4ff]/10 dark:bg-[#00d4ff]/10 text-[#00d4ff] dark:text-[#00d4ff] rounded-full text-sm border border-[#00d4ff]/30 font-mono">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-[#8b92b8] mb-4 line-clamp-3">
          {stripMarkdown(project.description)}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-[#1e2443] text-gray-600 dark:text-[#8b92b8] rounded text-sm border border-gray-200 dark:border-[#00d4ff]/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Link
            to={`/projects/${project.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:bg-[#0ea5e9] transition-colors shadow-lg shadow-[#00d4ff]/30 font-medium"
          >
            <span>{t('projects.viewDetails')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-transparent border-2 border-[#00d4ff] text-gray-900 dark:text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/10 transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}