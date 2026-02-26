import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, BookOpen } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { api, BlogPost } from '../../../services/api';
import { adminBlog } from '../../../services/adminApi';

export function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    tags: '',
    author: '',
    published_date: '',
    content: '',
    cover_image: '',
    content_language: 'en',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({ 
      ...formData, 
      name,
      slug: editing ? formData.slug : generateSlug(name)
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        tags: formData.tags || null,
      };
      if (editing) {
        await adminBlog.update(editing, data);
        setMessage('Post updated');
      } else {
        await adminBlog.create(data);
        setMessage('Post created');
      }
      setEditing(null);
      setShowForm(false);
      setFormData({ name: '', slug: '', description: '', category: '', tags: '', author: '', published_date: '', content: '', cover_image: '', content_language: 'en' });
      fetchPosts();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save post');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await adminBlog.delete(id);
      fetchPosts();
    } catch (err) {
      setMessage('Failed to delete');
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post.id);
    setShowForm(true);
    setFormData({
      name: post.name,
      slug: post.slug,
      description: post.description,
      category: post.category,
      tags: post.tags || '',
      author: post.author,
      published_date: post.published_date,
      content: post.content,
      cover_image: post.cover_image || '',
      content_language: post.content_language,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#00d4ff] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Editor</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your blog posts with Markdown</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditing(null);
              setFormData({ name: '', slug: '', description: '', category: '', tags: '', author: '', published_date: '', content: '', cover_image: '', content_language: 'en' });
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <div className="space-y-4">
            <input
              placeholder="Post Title"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
            <input
              placeholder="Slug (URL-friendly name)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Short Description"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
              />
              <input
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
              />
              <input
                type="date"
                value={formData.published_date}
                onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content Language</label>
              <select
                value={formData.content_language}
                onChange={(e) => setFormData({ ...formData, content_language: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
              >
                <option value="en">English (en)</option>
                <option value="ar">Arabic (ar)</option>
                <option value="tr">Turkish (tr)</option>
              </select>
            </div>
            <input
              placeholder="Cover Image URL"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />

            {/* Markdown Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content (Markdown)</label>
              <div data-color-mode="dark">
                <MDEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value || '' })}
                  height={400}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:opacity-90 transition-opacity"
            >
              <Check className="w-4 h-4" />
              {editing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-[#00d4ff]" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded">
                    {post.category}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#1e2443] text-gray-500 dark:text-gray-400 text-xs rounded font-mono">
                    {post.content_language}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.published_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{post.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">By {post.author}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => startEdit(post)}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
