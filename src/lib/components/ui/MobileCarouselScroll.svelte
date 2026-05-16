<!-- src/lib/components/ui/MobileCarouselScroll.svelte -->
<script lang="ts">
    import { scrollDirection } from "$lib/stores/scroll-store";

    let { is3D = false, children } = $props<{
        is3D?: boolean;
        children?: import("svelte").Snippet;
    }>();

    // CRITICAL BUG FIX: Reset store to 0 so consecutive swipes register!
    function triggerSectionChange(dir: number) {
        scrollDirection.set(dir);
        setTimeout(() => {
            scrollDirection.set(0);
        }, 100);
    }

    function verticalScrollHandler(node: HTMLElement) {
        let startY = 0;
        let startX = 0;

        // 1. Desktop/Mouse Wheel Handler
        function onWheel(e: WheelEvent) {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Ignore horizontal wheel

            if (is3D) {
                if (Math.abs(e.deltaY) > 5) {
                    triggerSectionChange(e.deltaY > 0 ? 1 : -1);
                }
                return;
            }

            const atTop = node.scrollTop <= 2;
            const atBottom =
                Math.abs(
                    node.scrollHeight - node.scrollTop - node.clientHeight,
                ) <= 2;

            if (atTop && e.deltaY < 0) {
                triggerSectionChange(-1);
            } else if (atBottom && e.deltaY > 0) {
                triggerSectionChange(1);
            }
        }

        // 2. Native Scroll Listener (Catches mobile "rubber-band" overscrolling)
        function onNativeScroll() {
            if (is3D) return;

            const maxScroll = node.scrollHeight - node.clientHeight;

            // If the user pulls the scrollbar past the physical top (iOS/Android rubber-band)
            if (node.scrollTop < -40) {
                triggerSectionChange(-1);
            }
            // If the user pulls the scrollbar past the physical bottom
            else if (node.scrollTop > maxScroll + 40 && maxScroll > 0) {
                triggerSectionChange(1);
            }
        }

        // 3. Fallback Touch Logic (Only fires if the browser didn't native-scroll)
        function onTouchStart(e: TouchEvent) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        function onTouchEnd(e: TouchEvent) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const dx = startX - endX;
            const dy = startY - endY; // Positive = user swiped UP

            // Ignore if the swipe was mostly horizontal
            if (Math.abs(dx) > Math.abs(dy)) return;

            const THRESHOLD = 50;

            if (Math.abs(dy) >= THRESHOLD) {
                if (is3D) {
                    triggerSectionChange(dy > 0 ? 1 : -1);
                } else {
                    const atTop = node.scrollTop <= 2;
                    const atBottom =
                        Math.abs(
                            node.scrollHeight -
                                node.scrollTop -
                                node.clientHeight,
                        ) <= 5;
                    const contentTooShortToScroll =
                        node.scrollHeight <= node.clientHeight;

                    if ((atTop || contentTooShortToScroll) && dy < -THRESHOLD) {
                        triggerSectionChange(-1);
                    } else if (
                        (atBottom || contentTooShortToScroll) &&
                        dy > THRESHOLD
                    ) {
                        triggerSectionChange(1);
                    }
                }
            }
        }

        node.addEventListener("wheel", onWheel, { passive: true });
        node.addEventListener("scroll", onNativeScroll, { passive: true });
        node.addEventListener("touchstart", onTouchStart, { passive: true });
        node.addEventListener("touchend", onTouchEnd, { passive: true });

        return {
            destroy() {
                node.removeEventListener("wheel", onWheel);
                node.removeEventListener("scroll", onNativeScroll);
                node.removeEventListener("touchstart", onTouchStart);
                node.removeEventListener("touchend", onTouchEnd);
            },
        };
    }
</script>

{#if is3D}
    <div
        use:verticalScrollHandler
        class="w-[100vw] h-[100dvh] max-h-[100dvh] shrink-0 snap-center relative pointer-events-none flex flex-col justify-end pb-28"
    >
        {#if children}{@render children()}{/if}
    </div>
{:else}
    <!-- FIX: max-h-[100dvh] strictly enforces the height against flexbox stretching -->
    <!-- FIX: overscroll-y-contain restores the scrollbar behavior without page bounce -->
    <div
        use:verticalScrollHandler
        data-carousel-scroller="true"
        class="block w-[100vw] h-[100dvh] max-h-[100dvh] shrink-0 snap-center relative z-20 pointer-events-auto overflow-y-auto overscroll-y-contain"
    >
        <div class="min-h-[101%] pb-32 pt-4 px-4">
            {#if children}{@render children()}{/if}
        </div>
    </div>
{/if}
