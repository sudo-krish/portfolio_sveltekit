<!-- src/lib/components/ui/buttons/NextSectionMobileCTA.svelte -->
<script lang="ts">
    import { ChevronDown } from "lucide-svelte";

    import { scrollTriggerTarget } from "$lib/stores/scroll-store";

    let {
        targetId = "",
        label = "Next Section",
        accentColor = "purple"
    } = $props<{
        targetId: string;
        label: string;
        accentColor?: AccentColor;
    }>();

    type AccentColor = "purple" | "cyan" | "emerald" | "blue" | "amber" | "green" | "orange" | "white";

    const colorMap: Record<AccentColor, string> = {
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
        cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20",
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
        amber: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20",
        green: "text-green-400 bg-green-500/10 border-green-500/20 hover:bg-green-500/20",
        orange: "text-orange-400 bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20",
        white: "text-foreground bg-foreground/5 border-foreground/10 hover:bg-foreground/10"
    };

    function scrollToTarget() {
        if (targetId) {
            scrollTriggerTarget.set(targetId);
        }
    }
</script>

<button
    type="button"
    onclick={scrollToTarget}
    class="flex items-center justify-center gap-2 w-full mt-4 p-4 rounded-[1.25rem] border backdrop-blur-md transition-all duration-300 {colorMap[accentColor as AccentColor]} active:scale-95"
>
    <span class="text-sm font-bold tracking-wide">
        {label}
    </span>
    <ChevronDown size={18} class="animate-bounce" />
</button>
