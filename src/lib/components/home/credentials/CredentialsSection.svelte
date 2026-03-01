<!-- src/lib/components/home/credentials/CredentialsSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import CertificationsCard from "./CertificationsCard.svelte";
    import ResearchCard from "./ResearchCard.svelte";

    onMount(() => {
        gsap.fromTo(
            ".cred-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: "#credentials", start: "top 60%" },
            },
        );
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <div
        class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[120px] pointer-events-none"
    ></div>

    <!-- Content: Right aligned (zig-zag 5) -->
    <div
        class="absolute top-[12%] md:top-[18%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-6 pointer-events-auto"
    >
        <div class="cred-card w-full h-[42dvh] lg:h-[38dvh]">
            <CertificationsCard />
        </div>
        <div class="cred-card w-full h-[42dvh] lg:h-[38dvh]">
            <ResearchCard />
        </div>
    </div>
</div>
