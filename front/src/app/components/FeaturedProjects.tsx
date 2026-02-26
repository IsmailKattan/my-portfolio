import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, Project } from '../../services/api';
import { PageLoading } from './loading';

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data.slice(0, 3)); // Get first 3 projects
      } catch (err) {
        console.error('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my latest work in cybersecurity, development, and cloud infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-[#151933] rounded-xl overflow-hidden border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all hover:shadow-lg hover:shadow-[#00d4ff]/10">
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#1e2443] to-[#151933]">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-600">No Image</span>
                    </div>
                  )}
                </div>
                <div
                  className="p-6"
                  lang={project.content_language}
                  dir={project.content_language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <span className="inline-block px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-[#1e2443] text-gray-600 dark:text-gray-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-[#00d4ff] hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[#00d4ff] transition-colors"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-[#0a0e27] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
