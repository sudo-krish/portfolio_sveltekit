<!-- src/lib/components/home/github/mobile/MobileAnchor.svelte -->
<script lang="ts">
    import { Github, Code2 } from "lucide-svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
</script>

<div class="flex flex-col items-center text-center w-full mt-2">
    <!-- Top Text Section -->
    <div
        class="text-[9px] font-mono text-green-400/80 uppercase tracking-[0.3em] mb-3"
    >
        {codingStatsData.leftAnchor.label}
    </div>

    <h2
        class="text-4xl sm:text-5xl font-black text-foreground/90 leading-[1.1] tracking-tight whitespace-pre-line mb-4"
    >
        {codingStatsData.leftAnchor.title.replace("\n", " ")}
    </h2>

    <p
        class="text-[0.85rem] text-foreground/50 font-light leading-relaxed max-w-[320px]"
    >
        {codingStatsData.leftAnchor.description}
    </p>

    <!-- Side-by-side Action Buttons -->
    <div class="flex flex-row items-center justify-center w-full gap-3 mt-6">
        <!-- GitHub Button -->
        <a
            href="/github"
            class="group relative inline-flex flex-1 sm:flex-none justify-center items-center gap-2 pl-3 pr-1 py-1 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:bg-foreground/[0.08] transition-all duration-300 shadow-md"
        >
            <div class="flex flex-col z-10 py-1 text-left">
                <span
                    class="font-mono text-[7px] text-foreground/40 uppercase tracking-widest leading-none mb-0.5"
                    >Profile</span
                >
                <span class="text-[10px] font-bold text-foreground leading-none"
                    >GitHub</span
                >
            </div>
            <div
                class="flex items-center justify-center w-7 h-7 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] z-10"
            >
                <Github size={12} />
            </div>
        </a>

        <!-- LeetCode Button -->
        <a
            href="/leetcode"
            class="group relative inline-flex flex-1 sm:flex-none justify-center items-center gap-2 pl-3 pr-1 py-1 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:bg-foreground/[0.08] transition-all duration-300 shadow-md"
        >
            <div class="flex flex-col z-10 py-1 text-left">
                <span
                    class="font-mono text-[7px] text-foreground/40 uppercase tracking-widest leading-none mb-0.5"
                    >Stats</span
                >
                <span class="text-[10px] font-bold text-foreground leading-none"
                    >LeetCode</span
                >
            </div>
            <div
                class="flex items-center justify-center w-7 h-7 rounded-full bg-[#ffa116]/10 border border-[#ffa116]/20 text-[#ffa116] z-10"
            >
                <Code2 size={12} />
            </div>
        </a>
    </div>
</div>
