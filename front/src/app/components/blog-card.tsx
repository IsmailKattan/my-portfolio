import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { BlogPost } from '../../services/api';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { t } = useTranslation();

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#151933] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 hover:shadow-[#00d4ff]/20 transition-all"
    >
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#1e2443] to-[#151933]">
        <img
          src={post.cover_image || 'https://via.placeholder.com/800x600?text=No+Image'}
          alt={post.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div
        className="p-6"
        lang={post.content_language}
        dir={post.content_language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-[#10b981]/10 dark:bg-[#10b981]/10 text-[#10b981] dark:text-[#10b981] rounded-full text-sm border border-[#10b981]/30 font-mono">
            {post.category}
          </span>
        </div>
        
        <h3 className="text-xl mb-2 text-gray-900 dark:text-[#e4e7f1]">{post.name}</h3>
        
        <p className="text-gray-600 dark:text-[#8b92b8] mb-4 line-clamp-3">{post.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.split(',').map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-[#1e2443] text-gray-600 dark:text-[#8b92b8] rounded text-sm border border-gray-200 dark:border-[#00d4ff]/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-[#8b92b8] mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.published_date).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="flex items-center gap-2 text-[#00d4ff] dark:text-[#00d4ff] hover:gap-3 transition-all font-medium"
        >
          <span>{t('blog.readMore')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}