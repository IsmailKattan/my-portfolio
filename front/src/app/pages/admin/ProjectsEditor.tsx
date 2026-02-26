import { useEffect, useState, useRef } from 'react';
import { Plus, Trash2, Edit2, X, Check, Upload, Eye } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { api, Project } from '../../../services/api';
import { adminProjects, adminUpload } from '../../../services/adminApi';

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    demo_url: '',
    repo_url: '',
    cover_image: '',
    content_language: 'en',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await adminUpload.uploadImage(file);
      setFormData({ ...formData, cover_image: result.url });
      setMessage('Image uploaded');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (editing) {
        await adminProjects.update(editing, data);
        setMessage('Project updated');
      } else {
        await adminProjects.create(data);
        setMessage('Project created');
      }
      setEditing(null);
      setFormData({ name: '', description: '', category: '', tags: '', demo_url: '', repo_url: '', cover_image: '', content_language: 'en' });
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save project');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await adminProjects.delete(id);
      fetchProjects();
    } catch (err) {
      setMessage('Failed to delete');
    }
  };

  const startEdit = (project: Project) => {
    setEditing(project.id);
    setFormData({
      name: project.name,
      description: project.description,
      category: project.category,
      tags: project.tags?.join(', ') || '',
      demo_url: project.demo_url || '',
      repo_url: project.repo_url || '',
      cover_image: project.cover_image || '',
      content_language: project.content_language,
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Editor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your portfolio projects</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {editing ? 'Edit Project' : 'Add New Project'}
        </h2>
        <div className="space-y-4">
          <input
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          {/* Markdown Editor for Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Markdown supported)
            </label>
            <div data-color-mode="dark">
              <MDEditor
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value || '' })}
                height={250}
              />
            </div>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Demo URL"
              value={formData.demo_url}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
            <input
              placeholder="Repository URL"
              value={formData.repo_url}
              onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
            <div className="flex gap-3 items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#1e2443] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1e2443]/70 transition-colors disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              {formData.cover_image && (
                <span className="text-sm text-green-500">Image selected</span>
              )}
            </div>
            {formData.cover_image && (
              <img src={formData.cover_image} alt="Preview" className="mt-3 w-32 h-20 object-cover rounded-lg" />
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:opacity-90 transition-opacity"
            >
              <Check className="w-4 h-4" />
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setEditing(null);
                  setFormData({ name: '', description: '', category: '', tags: '', demo_url: '', repo_url: '', cover_image: '', content_language: 'en' });
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e2443] rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-[#151933] rounded-xl overflow-hidden border border-gray-200 dark:border-[#00d4ff]/10">
            {project.cover_image && (
              <img src={project.cover_image} alt={project.name} className="w-full h-32 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="inline-block px-2 py-0.5 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded">
                      {project.category}
                    </span>
                    <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-[#1e2443] text-gray-500 dark:text-gray-400 text-xs rounded font-mono">
                      {project.content_language}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tags?.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-[#1e2443] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
