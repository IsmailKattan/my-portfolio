import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import { BlogCard } from '../components/blog-card';
import { motion } from 'motion/react';
import { api, BlogPost } from '../../services/api';
import { PageLoading } from '../components/loading';
import { ErrorMessage } from '../components/error-message';

export function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getBlogPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];
  
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  if (loading) return <PageLoading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPosts} />;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-4">{t('blog.title')}</h1>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 bg-white dark:bg-[#151933] rounded-lg p-4 shadow-lg border border-gray-200 dark:border-[#00d4ff]/10"
      >
        <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-[#e4e7f1]">
          <Filter className="w-5 h-5 text-[#10b981]" />
          <span className="font-semibold">{t('blog.category')}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                selectedCategory === category
                  ? 'bg-[#10b981] text-[#0a0e27] shadow-lg shadow-[#10b981]/30'
                  : 'bg-gray-100 dark:bg-[#1e2443] text-gray-700 dark:text-[#8b92b8] hover:bg-gray-200 dark:hover:bg-[#1e2443]/70 border border-gray-200 dark:border-[#00d4ff]/10'
              }`}
            >
              {category === 'all' ? t('blog.allCategories') : category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPosts?.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No blog posts found in this category.
        </div>
      )}
    </div>
  );
}