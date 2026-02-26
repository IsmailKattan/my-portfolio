import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { api, BlogPost } from '../../services/api';
import { PageLoading } from '../components/loading';
import { ErrorMessage } from '../components/error-message';
import { MarkdownRenderer } from '../components/markdown-renderer';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const data = await api.getBlogPost(slug);
      setPost(data);
    } catch (err) {
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.name,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Calculate read time (rough estimate: 200 words per minute)
  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  if (loading) return <PageLoading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPost} />;
  if (!post) return <ErrorMessage message="Blog post not found" onRetry={fetchPost} />;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-[#8b92b8] hover:text-[#10b981] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('common.backToBlog')}</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        lang={post.content_language}
        dir={post.content_language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Category & Share */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-sm border border-[#10b981]/30 font-mono">
            {post.category}
          </span>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#1e2443] rounded-lg transition-colors text-gray-600 dark:text-[#8b92b8]"
            title={t('common.share')}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900 dark:text-[#e4e7f1] leading-tight">
          {post.name}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600 dark:text-[#8b92b8]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.published_date).toLocaleDateString(undefined, { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{getReadTime(post.content)} {t('blog.readTime')}</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 rounded-xl overflow-hidden"
          >
            <img
              src={post.cover_image}
              alt={post.name}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <MarkdownRenderer content={post.content} />
        </motion.div>

        {/* Tags */}
        {post.tags && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-8 border-t border-gray-200 dark:border-[#00d4ff]/10"
          >
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#10b981]" />
              <span>{t('blog.tags')}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-[#1e2443] text-gray-700 dark:text-[#8b92b8] rounded-full text-sm border border-gray-200 dark:border-[#00d4ff]/10"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.article>
    </div>
  );
}
