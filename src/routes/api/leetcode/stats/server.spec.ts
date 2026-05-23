import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server';

vi.mock('$env/dynamic/public', () => ({
    env: { PUBLIC_LEETCODE_USERNAME: 'testuser' }
}));

describe('LeetCode API', () => {
    let mockSetHeaders: any;

    beforeEach(() => {
        mockSetHeaders = vi.fn();
        global.fetch = vi.fn();
    });

    it('returns combined stats on success', async () => {
        // Mock 6 fetches
        (global.fetch as any)
            .mockResolvedValueOnce({ ok: true, json: async () => ({ name: 'Test User', avatar: 'url' }) }) // profile
            .mockResolvedValueOnce({ ok: true, json: async () => ({
                solvedProblem: 100, easySolved: 50, mediumSolved: 40, hardSolved: 10,
                totalSubmissionNum: [{ difficulty: 'All', submissions: 200 }],
                acSubmissionNum: [{ difficulty: 'All', submissions: 100 }]
            }) }) // solved
            .mockResolvedValueOnce({ ok: true, json: async () => ({ languageProblemCount: [{ languageName: 'C++' }] }) }) // language
            .mockResolvedValueOnce({ ok: true, json: async () => ({
                advanced: [{ problemsSolved: 5 }], intermediate: [], fundamental: []
            }) }) // skill
            .mockResolvedValueOnce({ ok: true, json: async () => ({ streak: 5, totalActiveDays: 10 }) }) // calendar
            .mockResolvedValueOnce({ ok: true, json: async () => ({ badges: [] }) }); // badges

        const response = await GET({
            setHeaders: mockSetHeaders,
            platform: {},
            fetch: global.fetch as any
        } as any);

        const data = await response.json();
        
        expect(data.name).toBe('Test User');
        expect(data.totalSolved).toBe(100);
        expect(data.acceptanceRate).toBe(50); // 100 / 200 * 100
        expect(data.languages).toEqual(['C++']);
        expect(data.skillStats.advanced).toBe(5);
        expect(data.streak).toBe(5);
    });
});
