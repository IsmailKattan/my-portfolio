import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { api, Experience } from '../../../services/api';
import { adminExperiences } from '../../../services/adminApi';

export function ExperiencesEditor() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    position: '',
    company: '',
    duration: '',
    responsibilities: [''],
    content_language: 'en',
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await api.getExperiences();
      setExperiences(data);
    } catch (err) {
      console.error('Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = { ...formData, responsibilities: formData.responsibilities.filter(r => r) };
      if (editing) {
        await adminExperiences.update(editing, data);
        setMessage('Experience updated');
      } else {
        await adminExperiences.create(data);
        setMessage('Experience created');
      }
      setEditing(null);
      setFormData({ position: '', company: '', duration: '', responsibilities: [''], content_language: 'en' });
      fetchExperiences();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save experience');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await adminExperiences.delete(id);
      fetchExperiences();
    } catch (err) {
      setMessage('Failed to delete');
    }
  };

  const startEdit = (exp: Experience) => {
    setEditing(exp.id);
    setFormData({
      position: exp.position,
      company: exp.company,
      duration: exp.duration,
      responsibilities: exp.responsibilities.length ? exp.responsibilities : [''],
      content_language: exp.content_language,
    });
  };

  const addResponsibility = () => {
    setFormData({ ...formData, responsibilities: [...formData.responsibilities, ''] });
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResp = [...formData.responsibilities];
    newResp[index] = value;
    setFormData({ ...formData, responsibilities: newResp });
  };

  const removeResponsibility = (index: number) => {
    setFormData({ ...formData, responsibilities: formData.responsibilities.filter((_, i) => i !== index) });
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experiences Editor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your work experiences</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {editing ? 'Edit Experience' : 'Add New Experience'}
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
            <input
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            />
          </div>
          <input
            placeholder="Duration (e.g., 2021 - Present)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />

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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Responsibilities</label>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  placeholder={`Responsibility ${index + 1}`}
                  value={resp}
                  onChange={(e) => updateResponsibility(index, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => removeResponsibility(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addResponsibility}
              className="text-sm text-[#00d4ff] hover:underline"
            >
              + Add responsibility
            </button>
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
                  setFormData({ position: '', company: '', duration: '', responsibilities: [''], content_language: 'en' });
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
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#1e2443] text-gray-500 dark:text-gray-400 text-xs rounded font-mono">
                    {exp.content_language}
                  </span>
                </div>
                <p className="text-[#00d4ff]">{exp.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
                <ul className="mt-3 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-[#00d4ff] rounded-full flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(exp)}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
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
