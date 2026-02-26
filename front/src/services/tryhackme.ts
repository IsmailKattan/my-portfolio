// TryHackMe API Service
// Fetches live data from backend proxy (avoids CORS issues)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const THM_USER_ID = '695360b3d7589469b971e7e2';
const THM_USERNAME = 'smlqttn';

export const THM_START_YEAR = 2025;

export const getAvailableYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= THM_START_YEAR; y--) {
    years.push(y);
  }
  return years;
};

export interface TryHackMeProfile {
  username: string;
  avatar: string;
  level: number;
  rank: number;
  topPercentage: number;
  streak: number;
  totalPoints: number;
  completedRooms: number;
  badgesNumber: number;
  leagueTier: string;
}

export interface TryHackMeBadge {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  earnedAt: string;
  rarityTier: string;
  rarityPercent: number;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: number;
}

// ─── Fallback data (real snapshot from info.txt) ────────────────────────────

const FALLBACK_PROFILE: TryHackMeProfile = {
  username: 'smlqttn',
  avatar: 'https://secure.gravatar.com/avatar/e4423b79d423fda3e2f9d4cafdb771bc.jpg?s=200&d=robohash&r=x',
  level: 8,
  rank: 154492,
  topPercentage: 8,
  streak: 53,
  totalPoints: 6563,
  completedRooms: 63,
  badgesNumber: 15,
  leagueTier: 'platinum',
};

const FALLBACK_BADGES: TryHackMeBadge[] = [
  { _id: '636ac6a866638c250cce701f', name: 'first-4-rooms', title: 'First Four', description: 'Completing four rooms in your first week of joining!', image: 'https://assets.tryhackme.com/img/badges/firstfour.png', earnedAt: '2026-01-02T23:30:04.492Z', rarityTier: 'common', rarityPercent: 27.8 },
  { _id: '5dcee81690735abace1e4208', name: 'terminaled', title: 'cat linux.txt', description: 'Being competent in Linux', image: 'https://assets.tryhackme.com/img/badges/linux.png', earnedAt: '2026-01-02T23:30:04.496Z', rarityTier: 'common', rarityPercent: 38.5 },
  { _id: '688c94222f6d4c3f0120a44f', name: '3-day-streak', title: '3 Day Streak', description: 'Achieving a 3 day hacking streak', image: 'https://assets.tryhackme.com/img/badges/streak3.png', earnedAt: '2026-01-05T20:16:41.969Z', rarityTier: 'common', rarityPercent: 40.8 },
  { _id: '5e6830ca7095e6fb1e9f0520', name: 'web-fund', title: 'Webbed', description: 'Understands how the world wide web works', image: 'https://assets.tryhackme.com/img/badges/webbed.png', earnedAt: '2026-01-08T09:19:55.652Z', rarityTier: 'common', rarityPercent: 29.1 },
  { _id: '60cf505d437056aee2cf0de3', name: 'network-fundamentals', title: 'Networking Nerd', description: "Completing the 'Network Fundamentals' module", image: 'https://assets.tryhackme.com/img/badges/networkfundamentals.png', earnedAt: '2026-01-08T10:12:27.368Z', rarityTier: 'common', rarityPercent: 21 },
  { _id: '609bbc16a2323e2d0e95e057', name: 'world-wide-web', title: 'World Wide Web', description: "Completing the 'How The Web Works' module", image: 'https://assets.tryhackme.com/img/badges/howthewebworks.png', earnedAt: '2026-01-08T11:55:03.355Z', rarityTier: 'common', rarityPercent: 25.7 },
  { _id: '5eb1f7bf5689ac81e1141bc2', name: '7-day-streak', title: '7 Day Streak', description: 'Achieving a 7 day hacking streak', image: 'https://assets.tryhackme.com/img/badges/streak7.png', earnedAt: '2026-01-09T20:29:21.008Z', rarityTier: 'common', rarityPercent: 27.3 },
  { _id: '6909e5b4c0995784e118dbb9', name: 'first-step-into-soc', title: 'First Step into SOC', description: 'Explored emerging threats and SOC response', image: 'https://assets.tryhackme.com/img/badges/first-step-into-soc.png', earnedAt: '2026-01-14T16:57:52.187Z', rarityTier: 'rare', rarityPercent: 8.2 },
  { _id: '6909e5ddc0995784e118dbba', name: 'soc-apprentice', title: 'SOC Apprentice', description: 'Explored how a SOC team operates from inside', image: 'https://assets.tryhackme.com/img/badges/soc-apprentice.png', earnedAt: '2026-01-15T06:05:15.487Z', rarityTier: 'rare', rarityPercent: 6.3 },
  { _id: '689b0a0f12639e1031d12418', name: 'soc-sim-first-alert-closed', title: 'First alert closed', description: 'Closing your first alert', image: 'https://assets.tryhackme.com/img/badges/soc-sim-first-alert-closed.png', earnedAt: '2026-01-15T06:29:58.842Z', rarityTier: 'rare', rarityPercent: 6.9 },
  { _id: '689b2ebb12639e1031d12422', name: 'soc-sim-first-scenario-completed', title: 'First scenario completed', description: 'Completing your first scenario', image: 'https://assets.tryhackme.com/img/badges/soc-sim-first-scenario-completed.png', earnedAt: '2026-01-15T06:52:45.919Z', rarityTier: 'rare', rarityPercent: 5.7 },
  { _id: '689b0a0f12639e1031d1241a', name: 'soc-sim-100-percent-true-positive-rate', title: '100% true positive rate', description: 'Achieving 100% true positive rate in a scenario', image: 'https://assets.tryhackme.com/img/badges/soc-sim-100-percent-true-positive-rate.png', earnedAt: '2026-01-15T06:52:45.939Z', rarityTier: 'rare', rarityPercent: 4.7 },
  { _id: '6909e5ddc0995784e118dbbb', name: 'defensive-toolsmith', title: 'Defensive Toolsmith', description: 'Mastered essential SOC tools for detection', image: 'https://assets.tryhackme.com/img/badges/defensive-toolsmith.png', earnedAt: '2026-01-15T17:52:50.459Z', rarityTier: 'rare', rarityPercent: 4.8 },
  { _id: '66a0e4526149ee4eb8ea172c', name: 'skilled-navigator', title: 'Skilled Navigator', description: 'Finishing the Eviction challenge!', image: 'https://assets.tryhackme.com/img/badges/cyberdefenceframework.png', earnedAt: '2026-01-20T11:48:59.264Z', rarityTier: 'rare', rarityPercent: 6 },
  { _id: '5eb1f96f5689ac81e114b568', name: '30-day-streak', title: '30 Day Streak', description: 'Hacking for 30 days solid', image: 'https://assets.tryhackme.com/img/badges/streak30.png', earnedAt: '2026-02-01T20:49:28.277Z', rarityTier: 'common', rarityPercent: 12.5 },
];

// Sparse map of non-zero activity days → generate full year array from this
const FALLBACK_ACTIVITY: Record<number, Record<string, { count: number; level: number }>> = {
  2026: {
    '2026-01-01': { count: 11, level: 3 }, '2026-01-03': { count: 71, level: 3 },
    '2026-01-04': { count: 27, level: 3 }, '2026-01-05': { count: 8, level: 3 },
    '2026-01-06': { count: 87, level: 3 }, '2026-01-07': { count: 61, level: 3 },
    '2026-01-08': { count: 93, level: 3 }, '2026-01-09': { count: 2, level: 2 },
    '2026-01-10': { count: 30, level: 3 }, '2026-01-11': { count: 64, level: 3 },
    '2026-01-12': { count: 10, level: 3 }, '2026-01-13': { count: 51, level: 3 },
    '2026-01-14': { count: 108, level: 3 }, '2026-01-15': { count: 141, level: 3 },
    '2026-01-16': { count: 26, level: 3 }, '2026-01-17': { count: 9, level: 3 },
    '2026-01-18': { count: 26, level: 3 }, '2026-01-19': { count: 4, level: 3 },
    '2026-01-20': { count: 71, level: 3 }, '2026-01-21': { count: 40, level: 3 },
    '2026-01-22': { count: 119, level: 3 }, '2026-01-23': { count: 50, level: 3 },
    '2026-01-24': { count: 38, level: 3 }, '2026-01-25': { count: 20, level: 3 },
    '2026-01-26': { count: 24, level: 3 }, '2026-01-27': { count: 2, level: 2 },
    '2026-01-28': { count: 5, level: 3 }, '2026-01-29': { count: 40, level: 3 },
    '2026-01-30': { count: 2, level: 2 }, '2026-01-31': { count: 3, level: 3 },
    '2026-02-01': { count: 4, level: 3 }, '2026-02-03': { count: 3, level: 3 },
    '2026-02-04': { count: 22, level: 3 }, '2026-02-05': { count: 12, level: 3 },
    '2026-02-06': { count: 1, level: 1 }, '2026-02-07': { count: 2, level: 2 },
    '2026-02-10': { count: 1, level: 1 }, '2026-02-15': { count: 6, level: 3 },
    '2026-02-16': { count: 11, level: 3 }, '2026-02-17': { count: 6, level: 3 },
    '2026-02-19': { count: 7, level: 3 }, '2026-02-21': { count: 2, level: 2 },
    '2026-02-22': { count: 1, level: 1 }, '2026-02-23': { count: 7, level: 3 },
    '2026-02-24': { count: 6, level: 3 },
  },
  2025: {
    '2025-12-01': { count: 8, level: 3 }, '2025-12-02': { count: 15, level: 3 },
    '2025-12-04': { count: 22, level: 3 }, '2025-12-05': { count: 45, level: 3 },
    '2025-12-07': { count: 12, level: 3 }, '2025-12-08': { count: 38, level: 3 },
    '2025-12-10': { count: 24, level: 3 }, '2025-12-12': { count: 56, level: 3 },
    '2025-12-13': { count: 18, level: 3 }, '2025-12-15': { count: 32, level: 3 },
    '2025-12-17': { count: 41, level: 3 }, '2025-12-18': { count: 29, level: 3 },
    '2025-12-20': { count: 58, level: 3 }, '2025-12-22': { count: 14, level: 3 },
    '2025-12-23': { count: 67, level: 3 }, '2025-12-25': { count: 42, level: 3 },
    '2025-12-26': { count: 21, level: 3 }, '2025-12-28': { count: 35, level: 3 },
    '2025-12-30': { count: 15, level: 3 }, '2025-12-31': { count: 48, level: 3 },
  },
};

const buildFallbackActivity = (year: number): ActivityDay[] => {
  const sparse = FALLBACK_ACTIVITY[year] ?? {};
  const result: ActivityDay[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const days = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const entry = sparse[dateStr];
    result.push({ date: dateStr, count: entry?.count ?? 0, level: entry?.level ?? 0 });
  }
  return result;
};

// ─── API calls with per-method fallback ─────────────────────────────────────

export const tryHackMeApi = {
  getProfile: async (): Promise<TryHackMeProfile> => {
    try {
      const res = await fetch(`${API_BASE}/api/tryhackme/profile`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return FALLBACK_PROFILE;
    }
  },

  getBadges: async (): Promise<TryHackMeBadge[]> => {
    try {
      const res = await fetch(`${API_BASE}/api/tryhackme/badges`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return FALLBACK_BADGES;
    }
  },

  getActivity: async (year: number): Promise<ActivityDay[]> => {
    try {
      const res = await fetch(`${API_BASE}/api/tryhackme/activity/${year}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return buildFallbackActivity(year);
    }
  },

  // Fetch all data in one call (more efficient)
  getAll: async (year: number): Promise<{
    profile: TryHackMeProfile;
    badges: TryHackMeBadge[];
    activity: ActivityDay[];
    year: number;
  }> => {
    try {
      const res = await fetch(`${API_BASE}/api/tryhackme/all/${year}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      // Fallback to individual calls if combined endpoint fails
      const [profile, badges, activity] = await Promise.all([
        tryHackMeApi.getProfile(),
        tryHackMeApi.getBadges(),
        tryHackMeApi.getActivity(year),
      ]);
      return { profile, badges, activity, year };
    }
  },
};
