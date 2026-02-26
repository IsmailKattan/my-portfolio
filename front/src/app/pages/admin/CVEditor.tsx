import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Save, GraduationCap, Code } from 'lucide-react';
import { api, CVData } from '../../../services/api';
import { adminCV } from '../../../services/adminApi';

export function CVEditor() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchCV();
  }, []);

  const fetchCV = async () => {
    try {
      const data = await api.getCV();
      setCvData(data);
      if (data.personal_info) {
        reset(data.personal_info);
      }
    } catch (err) {
      console.error('Failed to fetch CV');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPersonalInfo = async (data: any) => {
    setSaving(true);
    try {
      await adminCV.updatePersonalInfo(data);
      setMessage('Personal info updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update personal info');
    } finally {
      setSaving(false);
    }
  };

  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [newSkill, setNewSkill] = useState('');

  const addEducation = async () => {
    if (!newEducation.degree || !newEducation.institution) return;
    try {
      await adminCV.createEducation(newEducation);
      setNewEducation({ degree: '', institution: '', year: '' });
      fetchCV();
      setMessage('Education added');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add education');
    }
  };

  const deleteEducation = async (id: number) => {
    if (!confirm('Delete this education entry?')) return;
    try {
      await adminCV.deleteEducation(id);
      fetchCV();
    } catch (err) {
      setMessage('Failed to delete education');
    }
  };

  const addSkill = async () => {
    if (!newSkill) return;
    try {
      await adminCV.createSkill({ name: newSkill });
      setNewSkill('');
      fetchCV();
      setMessage('Skill added');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add skill');
    }
  };

  const deleteSkill = async (id: number) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await adminCV.deleteSkill(id);
      fetchCV();
    } catch (err) {
      setMessage('Failed to delete skill');
    }
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CV Editor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal information, education, and skills
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Personal Info */}
      <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmitPersonalInfo)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input {...register('name')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input {...register('email')} type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input {...register('phone')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input {...register('location')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white" />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Personal Info'}
          </button>
        </form>
      </div>

      {/* Education */}
      <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-[#00d4ff]" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h2>
        </div>

        <div className="space-y-3 mb-4">
          {cvData?.education.map((edu) => (
            <div key={edu.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1e2443] rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{edu.degree}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution} • {edu.year}</p>
              </div>
              <button
                onClick={() => deleteEducation(edu.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            placeholder="Degree"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <input
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <input
            placeholder="Year (e.g., 2018-2020)"
            value={newEducation.year}
            onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
        </div>
        <button
          onClick={addEducation}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-[#00d4ff]" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {cvData?.skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm"
            >
              {skill.name}
              <button
                onClick={() => deleteSkill(skill.id)}
                className="hover:text-red-200"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            placeholder="New skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
}
