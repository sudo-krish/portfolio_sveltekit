import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const LEETCODE_USERNAME = 'user8673j';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

let cachedStats: any = null;
let lastFetch = 0;

interface LeetCodeStats {
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
  contestRating: number;
  contestAttended: number;
  contestGlobalRanking: number;
}

export const GET: RequestHandler = async () => {
  const now = Date.now();
  
  if (cachedStats && (now - lastFetch) < CACHE_DURATION) {

    return json(cachedStats);
  }
  
  try {
    // Primary API
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode stats');
    }
    
    const data = await response.json();
    
    // Enhanced stats object
    const stats: LeetCodeStats = {
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      totalSubmissions: data.totalSubmissions || 0,
      totalQuestions: data.totalQuestions || 3000,
      acceptanceRate: data.acceptanceRate || 0,
      ranking: data.ranking || 0,
      contributionPoints: data.contributionPoints || 0,
      reputation: data.reputation || 0,
      streak: data.streak || 0,
      activeDays: data.activeDays || 0,
      languages: data.languages || ['Python', 'JavaScript', 'C++'],
      skillStats: {
        advanced: data.advancedCount || 0,
        intermediate: data.intermediateCount || 0,
        fundamental: data.fundamentalCount || 0
      },
      badges: data.badges || [],
      contestRating: data.contestRating || 0,
      contestAttended: data.contestAttended || 0,
      contestGlobalRanking: data.contestGlobalRanking || 0
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
