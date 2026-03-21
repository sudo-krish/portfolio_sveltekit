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

export const GET: RequestHandler = async ({ platform, fetch, setHeaders }) => {
  const now = Date.now();

  // Set browser/CDN cache to 24 hours to aggressively prevent API calls
  setHeaders({
    'Cache-Control': 'public, max-age=86400, s-maxage=86400'
  });

  if (cachedStats && (now - lastFetch) < CACHE_DURATION) {
    return json(cachedStats);
  }

  try {
    const LEETCODE_USERNAME = platform?.env?.PUBLIC_LEETCODE_USERNAME || env.PUBLIC_LEETCODE_USERNAME || 'user8673j';
    
    const ALFA_API = 'https://alfa-leetcode-api.onrender.com';

    // Fetch multiple endpoints using Promise.all
    const [
      profileRes,
      solvedRes,
      languageRes,
      skillRes,
      calendarRes,
      badgesRes
    ] = await Promise.all([
      fetch(`${ALFA_API}/${LEETCODE_USERNAME}`),
      fetch(`${ALFA_API}/${LEETCODE_USERNAME}/solved`),
      fetch(`${ALFA_API}/${LEETCODE_USERNAME}/language`),
      fetch(`${ALFA_API}/${LEETCODE_USERNAME}/skill`),
      fetch(`${ALFA_API}/${LEETCODE_USERNAME}/calendar`),
      fetch(`${ALFA_API}/${LEETCODE_USERNAME}/badges`)
    ]);

    if (!profileRes.ok || !solvedRes.ok) {
      throw new Error(`Failed to fetch LeetCode stats. Profile: ${profileRes.status}, Solved: ${solvedRes.status}`);
    }

    const [profile, solved, language, skill, calendar, badges] = await Promise.all([
      profileRes.json(),
      solvedRes.json(),
      languageRes.ok ? languageRes.json() : { languageProblemCount: [] },
      skillRes.ok ? skillRes.json() : { advanced: [], intermediate: [], fundamental: [] },
      calendarRes.ok ? calendarRes.json() : { streak: 0, totalActiveDays: 0 },
      badgesRes.ok ? badgesRes.json() : { badges: [] }
    ]);

    // Calculate acceptance rate from acSubmissionNum and totalSubmissionNum
    let totalSubmissions = 0;
    let acSubmissions = 0;

    if (solved.totalSubmissionNum && solved.acSubmissionNum) {
      const allSub = solved.totalSubmissionNum.find((s: any) => s.difficulty === "All");
      const acSub = solved.acSubmissionNum.find((s: any) => s.difficulty === "All");
      if (allSub) totalSubmissions = allSub.submissions;
      if (acSub) acSubmissions = acSub.submissions;
    }

    const acceptanceRate = totalSubmissions > 0 ? Number(((acSubmissions / totalSubmissions) * 100).toFixed(2)) : 0;

    // Advanced, intermediate, fundamental counts from skill endpoint
    const sumProblems = (arr: any[]) => arr ? arr.reduce((acc, curr) => acc + (curr.problemsSolved || 0), 0) : 0;

    const stats: LeetCodeStats = {
      name: profile.name || LEETCODE_USERNAME,
      avatar: profile.avatar || '',
      totalSolved: solved.solvedProblem || 0,
      easySolved: solved.easySolved || 0,
      mediumSolved: solved.mediumSolved || 0,
      hardSolved: solved.hardSolved || 0,
      totalSubmissions: totalSubmissions,
      totalQuestions: 3000, // Leetcode total changes often, approx.
      acceptanceRate: acceptanceRate,
      ranking: profile.ranking || 0,
      contributionPoints: 0,
      reputation: profile.reputation || 0,
      streak: calendar.streak || 0,
      activeDays: calendar.totalActiveDays || 0,
      languages: language.languageProblemCount ? language.languageProblemCount.map((l: any) => l.languageName) : [],
      skillStats: {
        advanced: sumProblems(skill.advanced),
        intermediate: sumProblems(skill.intermediate),
        fundamental: sumProblems(skill.fundamental)
      },
      badges: badges.badges || [],
      recentSubmissions: []
    };

    cachedStats = stats;
    lastFetch = now;

    return json(stats);
  } catch (error) {
    console.error('❌ LeetCode API error:', error);

    // Fallback to cached data if available
    if (cachedStats) {
      return json(cachedStats);
    }

    return json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 });
  }
};
