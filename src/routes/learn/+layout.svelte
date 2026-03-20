<!-- src/routes/learn/+layout.svelte -->
<script lang="ts">
    import {
        ArrowLeft,
        Folder,
        FileText,
        ChevronRight,
        BookOpen,
    } from "lucide-svelte";
    import { slide } from "svelte/transition";
    import { page } from "$app/stores"; // To know what page we are currently on
    import type { LayoutData } from "./$types";

    let { data, children } = $props<{ data: LayoutData; children: any }>();

    // The data comes from your +layout.server.ts (or page data), assuming you return all items here
    let items = data.items || [];

    // State for sidebar expansion
    let expandedFolders = $state<Record<string, boolean>>({});

    // Group items by category for the directory tree
    let groupedItems = $derived.by(() => {
        const groups: Record<string, any[]> = {};
        items.forEach((item: any) => {
            const cat = item.category || "Uncategorized";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(item);
        });

        return Object.keys(groups)
            .sort()
            .reduce(
                (acc, key) => {
                    acc[key] = groups[key];
                    return acc;
                },
                {} as Record<string, any[]>,
            );
    });

    function toggleFolder(category: string) {
        expandedFolders[category] = !expandedFolders[category];
    }
</script>

<div
    class="min-h-screen bg-[#0a0a0c] flex flex-col md:flex-row text-foreground selection:bg-primary/30 font-sans"
>
    <!-- LEFT SIDEBAR (Persists across all /learn routes) -->
    <aside
        class="hidden md:flex flex-col w-72 lg:w-80 h-screen sticky top-0 border-r border-border/10 bg-[#0f0f12] shrink-0 z-20"
    >
        <!-- Sidebar Header -->
        <div
            class="h-16 flex items-center px-6 border-b border-border/10 shrink-0"
        >
            <a
                href="/"
                class="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group text-sm font-mono tracking-wider uppercase"
            >
                <ArrowLeft
                    size={16}
                    class="group-hover:-translate-x-1 transition-transform"
                />
                <span>Return Home</span>
            </a>
        </div>

        <!-- Directory Tree -->
        <div
            class="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-8"
        >
            <!-- Library Root -->
            <div>
                <div
                    class="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-3 px-2"
                >
                    Library
                </div>
                <a
                    href="/learn"
                    class="w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors {$page
                        .url.pathname === '/learn'
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}"
                >
                    <BookOpen size={16} />
                    <span class="text-sm">Overview (All Notes)</span>
                    <span class="ml-auto text-xs opacity-50"
                        >{items.length}</span
                    >
                </a>
            </div>

            <!-- Knowledge Folders -->
            <div>
                <div
                    class="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-3 px-2"
                >
                    Topics
                </div>

                <div class="space-y-1">
                    {#each Object.entries(groupedItems) as [category, categoryItems]}
                        <div class="flex flex-col">
                            <!-- Folder Row -->
                            <div
                                class="flex items-center w-full group rounded-lg hover:bg-white/5"
                            >
                                <button
                                    class="p-1.5 text-muted-foreground hover:text-foreground opacity-50 group-hover:opacity-100 transition-opacity"
                                    onclick={() => toggleFolder(category)}
                                >
                                    <ChevronRight
                                        size={14}
                                        class="transition-transform duration-200 {expandedFolders[
                                            category
                                        ]
                                            ? 'rotate-90'
                                            : ''}"
                                    />
                                </button>

                                <button
                                    class="flex-1 flex items-center gap-2 py-2 pr-2 text-left transition-colors text-muted-foreground hover:text-foreground"
                                    onclick={() => toggleFolder(category)}
                                >
                                    <Folder size={14} />
                                    <span class="text-sm truncate"
                                        >{category}</span
                                    >
                                    <span
                                        class="ml-auto text-[10px] font-mono opacity-40"
                                        >{categoryItems.length}</span
                                    >
                                </button>
                            </div>

                            <!-- Expanded Files (Deep Links) -->
                            {#if expandedFolders[category]}
                                <div
                                    class="ml-6 mt-1 mb-2 border-l border-border/10 pl-2 space-y-1"
                                    in:slide={{ duration: 200 }}
                                    out:slide={{ duration: 200 }}
                                >
                                    {#each categoryItems as item}
                                        <a
                                            href="/learn/{item.slug}"
                                            class="flex items-start gap-2 py-1.5 px-2 text-xs rounded-md transition-colors group
                                            {$page.url.pathname ===
                                            `/learn/${item.slug}`
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}"
                                        >
                                            <FileText
                                                size={12}
                                                class="shrink-0 mt-0.5 opacity-40 group-hover:opacity-100"
                                            />
                                            <span class="truncate"
                                                >{item.title}</span
                                            >
                                        </a>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </aside>

    <!-- RIGHT CANVAS: This is where +page.svelte OR [slug]/+page.svelte will be rendered -->
    <main class="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        <!-- Ambient Background Glow -->
        <div
            class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"
        ></div>

        <!-- Render child pages (Grid OR Document) here -->
        <div class="flex-1 overflow-y-auto">
            {@render children()}
        </div>
    </main>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
    }
</style>
