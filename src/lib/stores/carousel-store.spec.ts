import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { carouselSwipeFraction, carouselExitDirection } from './carousel-store';

describe('carousel-store', () => {
    beforeEach(() => {
        carouselSwipeFraction.set(0);
        carouselExitDirection.set('left');
    });

    it('should initialize with default values', () => {
        expect(get(carouselSwipeFraction)).toBe(0);
        expect(get(carouselExitDirection)).toBe('left');
    });

    it('should update carouselSwipeFraction', () => {
        carouselSwipeFraction.set(0.5);
        expect(get(carouselSwipeFraction)).toBe(0.5);
    });

    it('should update carouselExitDirection', () => {
        carouselExitDirection.set('right');
        expect(get(carouselExitDirection)).toBe('right');
    });
});
