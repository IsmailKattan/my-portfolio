import { useEffect, useState } from 'react';
import { 
  User, 
  Briefcase, 
  FolderGit2, 
  Award, 
  BookOpen,
  TrendingUp,
  Eye
} from 'lucide-react';
import { api } from '../../../services/api';

interface Stats {
  cv: { education: number; skills: number };
  experiences: number;
  projects: number;
  certificates: number;
  blog: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cv, experiences, projects, certificates, blog] = await Promise.all([
          api.getCV(),
          api.getExperiences(),
          api.getProjects(),
          api.getCertificates(),
          api.getBlogPosts(),
        ]);

        setStats({
          cv: { education: cv.education.length, skills: cv.skills.length },
          experiences: experiences.length,
          projects: projects.length,
          certificates: certificates.length,
          blog: blog.length,
        });
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { 
      label: 'Education Entries', 
      value: stats?.cv.education || 0, 
      icon: User, 
      color: 'from-blue-500 to-cyan-500',
      path: '/admin/cv'
    },
    { 
      label: 'Skills', 
      value: stats?.cv.skills || 0, 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      path: '/admin/cv'
    },
    { 
      label: 'Experiences', 
      value: stats?.experiences || 0, 
      icon: Briefcase, 
      color: 'from-purple-500 to-pink-500',
      path: '/admin/experiences'
    },
    { 
      label: 'Projects', 
      value: stats?.projects || 0, 
      icon: FolderGit2, 
      color: 'from-orange-500 to-red-500',
      path: '/admin/projects'
    },
    { 
      label: 'Certificates', 
      value: stats?.certificates || 0, 
      icon: Award, 
      color: 'from-yellow-500 to-amber-500',
      path: '/admin/certificates'
    },
    { 
      label: 'Blog Posts', 
      value: stats?.blog || 0, 
      icon: BookOpen, 
      color: 'from-teal-500 to-cyan-500',
      path: '/admin/blog'
    },
  ];

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.label}
              href={card.path}
              className="block bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-[#00d4ff]">
                <Eye className="w-4 h-4 mr-1" />
                <span>Manage</span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-2">
          Getting Started
        </h2>
        <p className="text-blue-700 dark:text-blue-300">
          Your portfolio is currently empty. Click on any section above to start adding content. 
          Each section has forms to create, edit, and manage your portfolio items.
        </p>
      </div>
    </div>
  );
}
