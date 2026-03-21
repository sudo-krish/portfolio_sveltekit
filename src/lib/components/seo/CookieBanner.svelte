<script lang="ts">
    import { onMount } from "svelte";
    import { fly, fade, slide } from "svelte/transition";
    import { ChevronDown, ShieldCheck } from "lucide-svelte";
    import { page } from "$app/stores";

    let showBanner = false;
    let showDetails = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    onMount(() => {
        const consent = localStorage.getItem("portfolio_cookie_consent");

        if (!consent) {
            timer = setTimeout(() => {
                showBanner = true;
            }, 1800);
        } else if (consent === "granted") {
            injectGA();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    });

    function injectGA() {
        if (document.getElementById("ga-script")) return;

        const script = document.createElement("script");
        script.id = "ga-script";
        script.src = `https://www.googletagmanager.com/gtag/js?id=${$page.data.gaMeasurementId}`;
        script.async = true;
        document.head.appendChild(script);

        const initScript = document.createElement("script");
        initScript.id = "ga-init-script";
        initScript.innerHTML = `
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${$page.data.gaMeasurementId}');
		`;
        document.head.appendChild(initScript);
    }

    function accept() {
        localStorage.setItem("portfolio_cookie_consent", "granted");
        showBanner = false;
        injectGA();
    }

    function reject() {
        localStorage.setItem("portfolio_cookie_consent", "denied");
        showBanner = false;
    }
</script>

{#if showBanner}
    <div
        class="fixed inset-x-0 bottom-0 z-[9999] px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none"
        transition:fade={{ duration: 200 }}
    >
        <div
            class="pointer-events-auto mx-auto sm:mx-0 w-full sm:max-w-[420px] rounded-2xl border border-white/10 bg-[rgba(16,18,24,0.88)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.28)] overflow-hidden"
            transition:fly={{ duration: 350, y: 24 }}
            role="dialog"
            aria-label="Cookie consent"
            aria-modal="false"
        >
            <div class="p-4 sm:p-5">
                <div class="flex items-start gap-3">
                    <div
                        class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                    >
                        <ShieldCheck size={18} />
                    </div>

                    <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-3">
                            <h3
                                class="text-sm font-semibold tracking-tight text-foreground"
                            >
                                Privacy, kept simple
                            </h3>

                            <button
                                type="button"
                                class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                on:click={() => (showDetails = !showDetails)}
                                aria-expanded={showDetails}
                            >
                                Details
                                <ChevronDown
                                    size={14}
                                    class={`transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>

                        <p
                            class="mt-1.5 text-sm leading-6 text-muted-foreground"
                        >
                            I use analytics only to understand visits and
                            improve the portfolio. No ads, no cross-site
                            tracking.
                        </p>
                    </div>
                </div>

                {#if showDetails}
                    <div
                        class="mt-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3"
                        transition:slide={{ duration: 180 }}
                    >
                        <p class="text-xs leading-5 text-muted-foreground">
                            Analytics are loaded only if you accept. Your choice
                            is stored locally in this browser and can be changed
                            later from site settings.
                        </p>
                    </div>
                {/if}

                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                        type="button"
                        on:click={reject}
                        class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-all active:scale-[0.98]"
                    >
                        Reject
                    </button>

                    <button
                        type="button"
                        on:click={accept}
                        class="inline-flex items-center justify-center rounded-xl border border-primary/30 bg-primary/15 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-all active:scale-[0.98]"
                    >
                        Accept analytics
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
