import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

let cachedStats: any = null;
let lastFetch = 0;

interface LeetCodeStats {
  name: string;
  avatar: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  totalQuestions: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  streak: number;
  activeDays: number;
  languages: string[];
  skillStats: {
    advanced: number;
    intermediate: number;
    fundamental: number;
  };
  badges: Array<{
    name: string;
    icon: string;
  }>;
  recentSubmissions: Array<any>;
}

function parseOptionalJson(res: Response, fallback: any) {
  return res.ok ? res.json() : Promise.resolve(fallback);
}

function computeAcceptanceInfo(solved: any) {
  if (!solved.totalSubmissionNum || !solved.acSubmissionNum) {
    return { totalSubmissions: 0, acceptanceRate: 0 };
  }
  const allSub = solved.totalSubmissionNum.find((s: any) => s.difficulty === 'All');
  const acSub = solved.acSubmissionNum.find((s: any) => s.difficulty === 'All');
  const totalSubmissions = allSub ? allSub.submissions : 0;
  const acSubmissions = acSub ? acSub.submissions : 0;
  const acceptanceRate =
    totalSubmissions > 0 ? Number(((acSubmissions / totalSubmissions) * 100).toFixed(2)) : 0;
  return { totalSubmissions, acceptanceRate };
}

function sumProblems(arr?: any[]): number {
  return arr ? arr.reduce((acc, curr) => acc + (curr.problemsSolved || 0), 0) : 0;
}

function numOrZero(val: unknown): number {
  return typeof val === 'number' ? val : 0;
}

function mapLeetCodeStats(
  username: string,
  profile: any,
  solved: any,
  language: any,
  skill: any,
  calendar: any,
  badges: any,
): LeetCodeStats {
  const { totalSubmissions, acceptanceRate } = computeAcceptanceInfo(solved);
  const languages = Array.isArray(language.languageProblemCount)
    ? language.languageProblemCount.map((l: any) => l.languageName)
    : [];

  return {
    name: profile.name || username,
    avatar: profile.avatar || '',
    totalSolved: numOrZero(solved.solvedProblem),
    easySolved: numOrZero(solved.easySolved),
    mediumSolved: numOrZero(solved.mediumSolved),
    hardSolved: numOrZero(solved.hardSolved),
    totalSubmissions,
    totalQuestions: 3000,
    acceptanceRate,
    ranking: numOrZero(profile.ranking),
    contributionPoints: 0,
    reputation: numOrZero(profile.reputation),
    streak: numOrZero(calendar.streak),
    activeDays: numOrZero(calendar.totalActiveDays),
    languages,
    skillStats: {
      advanced: sumProblems(skill.advanced),
      intermediate: sumProblems(skill.intermediate),
      fundamental: sumProblems(skill.fundamental),
    },
    badges: badges.badges || [],
    recentSubmissions: [],
  };
}

function resolveLeetCodeUsername(platform: any): string {
  return platform?.env?.PUBLIC_LEETCODE_USERNAME || env.PUBLIC_LEETCODE_USERNAME || 'user8673j';
}

export const GET: RequestHandler = async ({ platform, fetch, setHeaders }) => {
  const now = Date.now();

  setHeaders({
    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
  });

  if (cachedStats && now - lastFetch < CACHE_DURATION) {
    return json(cachedStats);
  }

  try {
    const username = resolveLeetCodeUsername(platform);
    const ALFA_API = 'https://alfa-leetcode-api.onrender.com';

    const [profileRes, solvedRes, languageRes, skillRes, calendarRes, badgesRes] =
      await Promise.all([
        fetch(`${ALFA_API}/${username}`),
        fetch(`${ALFA_API}/${username}/solved`),
        fetch(`${ALFA_API}/${username}/language`),
        fetch(`${ALFA_API}/${username}/skill`),
        fetch(`${ALFA_API}/${username}/calendar`),
        fetch(`${ALFA_API}/${username}/badges`),
      ]);

    if (!profileRes.ok || !solvedRes.ok) {
      throw new Error(
        `Failed to fetch LeetCode stats. Profile: ${profileRes.status}, Solved: ${solvedRes.status}`,
      );
    }

    const [profile, solved, language, skill, calendar, badges] = await Promise.all([
      profileRes.json(),
      solvedRes.json(),
      parseOptionalJson(languageRes, { languageProblemCount: [] }),
      parseOptionalJson(skillRes, { advanced: [], intermediate: [], fundamental: [] }),
      parseOptionalJson(calendarRes, { streak: 0, totalActiveDays: 0 }),
      parseOptionalJson(badgesRes, { badges: [] }),
    ]);

    const stats = mapLeetCodeStats(username, profile, solved, language, skill, calendar, badges);

    cachedStats = stats;
    lastFetch = now;

    return json(stats);
  } catch (error) {
    console.error('❌ LeetCode API error:', error);

    if (cachedStats) {
      return json(cachedStats);
    }

    return json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 });
  }
};
