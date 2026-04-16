import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api, Project } from '../../services/api';
import { PageLoading } from '../components/loading';
import { ErrorMessage } from '../components/error-message';
import { MarkdownRenderer } from '../components/markdown-renderer';
import { SEO } from '../../components/SEO';

// Extended project interface for detail view
interface ProjectDetail extends Project {
  long_description?: string;
  images?: string[];
  tech_stack?: string[];
  features?: string[];
  challenges?: string[];
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProject = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProject(Number(id));
      // For now, use the basic project data. In the future, backend can return extended details
      setProject({
        ...data,
        long_description: data.description,
        images: data.cover_image ? [data.cover_image] : [],
        tech_stack: data.tags,
      });
    } catch (err) {
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  const seoTitle = loading || !project ? 'Projects' : project.name;
  const seoDescription = loading || !project ? '' : project.description;

  if (loading) return <PageLoading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProject} />;
  if (!project) return <ErrorMessage message="Project not found" onRetry={() => navigate('/projects')} />;

  return (
    <div
      className="max-w-5xl mx-auto"
      lang={project.content_language}
      dir={project.content_language === 'ar' ? 'rtl' : 'ltr'}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/projects/${id}`}
      />
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-[#8b92b8] hover:text-[#00d4ff] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('common.backToProjects')}</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="inline-block px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] rounded-full text-sm border border-[#00d4ff]/30 font-mono mb-4">
          {project.category}
        </span>
        <h1 className="text-4xl md:text-5xl mb-4 text-gray-900 dark:text-[#e4e7f1]">{project.name}</h1>
      </motion.div>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1e2443] to-[#151933] aspect-video"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={project.images[currentImageIndex]}
              alt={`${project.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-[#00d4ff]' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:bg-[#0ea5e9] transition-colors shadow-lg shadow-[#00d4ff]/30 font-medium"
          >
            <ExternalLink className="w-5 h-5" />
            <span>{t('projects.tryDemo')}</span>
          </a>
        )}
        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[#00d4ff] text-gray-900 dark:text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/10 transition-colors font-medium"
          >
            <Github className="w-5 h-5" />
            <span>{t('projects.viewRepo')}</span>
          </a>
        )}
      </motion.div>

      {/* Tech Stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <Tag className="w-6 h-6 text-[#00d4ff]" />
            <span>{t('projects.techStack')}</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-[#1e2443] text-gray-700 dark:text-[#8b92b8] rounded-lg border border-gray-200 dark:border-[#00d4ff]/10 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl mb-4">{t('projects.about')}</h2>
        <MarkdownRenderer content={project.long_description || project.description} />
      </motion.div>
    </div>
  );
}
