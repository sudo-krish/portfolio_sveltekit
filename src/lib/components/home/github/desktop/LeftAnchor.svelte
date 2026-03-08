<!-- src/lib/components/home/github/desktop/LeftAnchor.svelte -->
<script lang="ts">
    import { Github, Code2 } from "lucide-svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
</script>

<!-- Added justify-between to push the children to the top and bottom -->
<div
    class="flex flex-col items-start w-full h-full justify-between pb-12 relative"
>
    <!-- Top Text Section (No mt-auto needed) -->
    <div>
        <div
            class="text-[10px] font-mono text-green-400/80 uppercase tracking-[0.3em] mb-4 block"
        >
            {codingStatsData.leftAnchor.label}
        </div>

        <h2
            class="text-6xl xl:text-7xl font-black text-white/10 leading-[0.9] tracking-tighter whitespace-pre-line mb-6 block"
        >
            {codingStatsData.leftAnchor.title}
        </h2>

        <p
            class="text-[clamp(0.85rem,1vw,1rem)] text-white/40 font-light leading-relaxed max-w-[280px]"
        >
            {codingStatsData.leftAnchor.description}
        </p>
    </div>

    <!-- Side-by-side Action Buttons aligned to the bottom -->
    <div class="flex flex-row items-center gap-4">
        <!-- GitHub Button -->
        <a
            href="/github"
            class="group relative inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-[#22c55e]/50 transition-all duration-500 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
        >
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            ></div>

            <div class="flex flex-col z-10 py-1">
                <span
                    class="font-mono text-[8px] text-white/40 uppercase tracking-widest leading-none mb-0.5"
                >
                    View Profile
                </span>
                <span class="text-xs font-bold text-white leading-none">
                    GitHub
                </span>
            </div>

            <!-- Animated Icon Circle -->
            <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 group-hover:bg-[#22c55e] group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300 z-10"
            >
                <Github
                    size={14}
                    class="text-[#22c55e] group-hover:text-white transition-all duration-300"
                />
            </div>
        </a>

        <!-- LeetCode Button -->
        <a
            href="/leetcode"
            class="group relative inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-[#ffa116]/50 transition-all duration-500 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
        >
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,161,22,0.15)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            ></div>

            <div class="flex flex-col z-10 py-1">
                <span
                    class="font-mono text-[8px] text-white/40 uppercase tracking-widest leading-none mb-0.5"
                >
                    View Stats
                </span>
                <span class="text-xs font-bold text-white leading-none">
                    LeetCode
                </span>
            </div>

            <!-- Animated Icon Circle -->
            <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-[#ffa116]/10 border border-[#ffa116]/20 group-hover:bg-[#ffa116] group-hover:shadow-[0_0_15px_rgba(255,161,22,0.6)] transition-all duration-300 z-10"
            >
                <Code2
                    size={14}
                    class="text-[#ffa116] group-hover:text-white transition-all duration-300"
                />
            </div>
        </a>
    </div>
</div>
