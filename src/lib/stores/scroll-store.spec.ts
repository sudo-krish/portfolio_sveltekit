import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { scrollTriggerTarget, scrollDirection, activeSectionIndex } from './scroll-store';

describe('scroll-store', () => {
    beforeEach(() => {
        // Reset stores before each test
        scrollTriggerTarget.set(null);
        scrollDirection.set(0);
        activeSectionIndex.set(0);
    });

    it('should initialize with default values', () => {
        expect(get(scrollTriggerTarget)).toBeNull();
        expect(get(scrollDirection)).toBe(0);
        expect(get(activeSectionIndex)).toBe(0);
    });

    it('should update scrollTriggerTarget', () => {
        scrollTriggerTarget.set('experience');
        expect(get(scrollTriggerTarget)).toBe('experience');
    });

    it('should update scrollDirection', () => {
        scrollDirection.set(1);
        expect(get(scrollDirection)).toBe(1);
        scrollDirection.set(-1);
        expect(get(scrollDirection)).toBe(-1);
    });

    it('should update activeSectionIndex', () => {
        activeSectionIndex.set(3);
        expect(get(activeSectionIndex)).toBe(3);
    });
});
