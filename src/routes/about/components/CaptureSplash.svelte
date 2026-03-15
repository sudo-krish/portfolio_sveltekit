<script lang="ts">
    export let battleState: string;
</script>

{#if battleState === "capture_animation"}
    <!-- The Parabolic Thrown Ball (Only exists from 0s to 1s) -->
    <div class="absolute inset-0 z-50 pointer-events-none overflow-hidden">
        <div class="absolute w-8 h-8 animate-throw-parabola">
            <div
                class="w-full h-full rounded-full bg-white border-[3px] border-[#333] overflow-hidden flex flex-col shadow-xl"
            >
                <div
                    class="w-full h-1/2 bg-[#e3350d] border-b-[3px] border-[#333]"
                ></div>
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-[3px] border-[#333] rounded-full"
                ></div>
            </div>
        </div>
    </div>
    <!-- Hit Flash Effect at exactly 1.0s -->
    <div
        class="absolute inset-0 bg-white z-40 pointer-events-none opacity-0 animate-hit-flash"
    ></div>
{/if}

<style>
    .animate-throw-parabola {
        animation: throwParabola 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
    }
    @keyframes throwParabola {
        0% {
            left: 15%;
            top: 75%;
            transform: scale(2) rotate(0deg);
            opacity: 1;
        }
        50% {
            left: 45%;
            top: 20%;
            transform: scale(1.5) rotate(360deg);
            opacity: 1;
        }
        95% {
            left: 75%;
            top: 25%;
            transform: scale(0.8) rotate(720deg);
            opacity: 1;
        }
        100% {
            left: 75%;
            top: 25%;
            transform: scale(0) rotate(720deg);
            opacity: 0;
        }
    }
    .animate-hit-flash {
        animation: hitFlash 0.2s ease-out 1s forwards;
    }
    @keyframes hitFlash {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
