import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Trophy, Flame, Target, Award, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { tryHackMeApi, getAvailableYears, TryHackMeProfile, TryHackMeBadge, ActivityDay } from '../../services/tryhackme';

// Activity Heatmap Component
function ActivityHeatmap({ data }: { data: ActivityDay[] }) {
  const { t, i18n } = useTranslation();
  
  // Group data by weeks
  const weeks: ActivityDay[][] = [];
  let currentWeek: ActivityDay[] = [];
  
  data.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    if (index === data.length - 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
  });
  
  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-800/30';
      case 1: return 'bg-[#00d4ff]/30';
      case 2: return 'bg-[#00d4ff]/60';
      case 3: return 'bg-[#00d4ff]';
      default: return 'bg-gray-800/30';
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-1 min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: weekIndex * 0.01 + dayIndex * 0.005 }}
                className={`w-3 h-3 rounded-sm ${getColor(day.level)} hover:ring-2 hover:ring-[#00d4ff]/50 transition-all cursor-pointer`}
                title={`${formatDate(day.date)}: ${day.count} tasks completed`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <span>{t('landing.tryhackme.heatmapLess')}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-800/30" />
          <div className="w-3 h-3 rounded-sm bg-[#00d4ff]/30" />
          <div className="w-3 h-3 rounded-sm bg-[#00d4ff]/60" />
          <div className="w-3 h-3 rounded-sm bg-[#00d4ff]" />
        </div>
        <span>{t('landing.tryhackme.heatmapMore')}</span>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, value, labelKey, suffix = '' }: { 
  icon: React.ElementType; 
  value: number; 
  labelKey: string;
  suffix?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[#00d4ff]" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">
          {value.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-gray-400">{t(labelKey)}</div>
      </div>
    </div>
  );
}

// Badge Card Component
function BadgeCard({ badge }: { badge: TryHackMeBadge }) {
  const { t } = useTranslation();
  const rarityColors: Record<string, string> = {
    common: 'border-gray-600/50',
    rare: 'border-purple-500/50',
    epic: 'border-orange-500/50',
    legendary: 'border-yellow-500/50',
  };
  
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white/5 border ${rarityColors[badge.rarityTier] || 'border-gray-600/50'} rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/10`}
    >
      <img 
        src={badge.image} 
        alt={badge.title}
        className="w-14 h-14 rounded-lg object-contain bg-black/20"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white text-sm truncate">{badge.title}</h4>
        <p className="text-xs text-gray-400 line-clamp-2">{badge.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
            badge.rarityTier === 'rare' ? 'bg-purple-500/20 text-purple-400' :
            badge.rarityTier === 'epic' ? 'bg-orange-500/20 text-orange-400' :
            badge.rarityTier === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {t(`landing.tryhackme.rarity.${badge.rarityTier}`)}
          </span>
          <span className="text-xs text-gray-500">{badge.rarityPercent}% {t('landing.tryhackme.percentHave')}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function TryHackMeActivity() {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<TryHackMeProfile | null>(null);
  const [badges, setBadges] = useState<TryHackMeBadge[]>([]);
  const [activity, setActivity] = useState<ActivityDay[]>([]);
  const availableYears = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]); // Default to current year
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Use the combined endpoint for better performance
        const data = await tryHackMeApi.getAll(selectedYear);
        setProfile(data.profile);
        setBadges(data.badges);
        setActivity(data.activity);
      } catch (error) {
        console.error('Failed to fetch TryHackMe data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  if (loading) {
    return (
      <section className="py-20 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-[#00d4ff] border-t-transparent rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section className="py-20 bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
              <Shield className="w-6 h-6 text-[#00d4ff]" />
            </div>
            <span className="text-[#00d4ff] text-sm font-semibold tracking-wider uppercase">
              {t('landing.tryhackme.badge')}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t('landing.tryhackme.title')}
              </h2>
              <p className="text-gray-400">
                {t('landing.tryhackme.subtitle')}
              </p>
            </div>
            <a
              href={`https://tryhackme.com/p/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00d4ff] text-[#0a0e27] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {t('landing.tryhackme.viewProfile')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#151933] to-[#0f1428] border border-[#00d4ff]/20 rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img 
              src={profile.avatar} 
              alt={profile.username}
              className="w-20 h-20 rounded-2xl border-2 border-[#00d4ff]/30"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-white">@{profile.username}</h3>
                <span className="px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] text-sm font-medium capitalize">
                  {profile.leagueTier} {t('landing.tryhackme.league')}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>{t('landing.tryhackme.level')} {profile.level}</span>
                <span>•</span>
                <span>{t('landing.tryhackme.rank')} #{profile.rank.toLocaleString()}</span>
                <span>•</span>
                <span>{t('landing.tryhackme.topPercent')} {profile.topPercentage}%</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard 
            icon={Trophy} 
            value={profile.totalPoints} 
            labelKey="landing.tryhackme.stats.points" 
          />
          <StatCard 
            icon={Target} 
            value={profile.completedRooms} 
            labelKey="landing.tryhackme.stats.rooms" 
          />
          <StatCard 
            icon={Flame} 
            value={profile.streak} 
            labelKey="landing.tryhackme.stats.streak" 
          />
          <StatCard 
            icon={Award} 
            value={profile.badgesNumber} 
            labelKey="landing.tryhackme.stats.badges" 
          />
        </motion.div>

        {/* Activity Heatmap with Year Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-[#151933] border border-[#00d4ff]/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">{t('landing.tryhackme.heatmap')}</h3>
            
            {/* Year Selector Buttons */}
            <div className="flex gap-1.5 flex-wrap">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                    year === selectedYear
                      ? 'bg-[#00d4ff]/15 text-[#00d4ff] border-[#00d4ff]/40'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/10'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          <ActivityHeatmap data={activity} />
        </motion.div>

        {/* Badges Section - Show only rarest badges (rare and above, sorted by rarity %) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">{t('landing.tryhackme.badgesTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges
              .filter(b => b.rarityTier === 'rare' || b.rarityTier === 'epic' || b.rarityTier === 'legendary')
              .sort((a, b) => a.rarityPercent - b.rarityPercent)
              .slice(0, 6)
              .map((badge, index) => (
                <motion.div
                  key={badge._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BadgeCard badge={badge} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
