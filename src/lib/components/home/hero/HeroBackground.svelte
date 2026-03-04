<script lang="ts">
  import { heroContent, type TechItem } from "$lib/data/hero_content";

  // The Tech Icons
  const techStack = heroContent.marquee.techStack;

  // The Phrases
  const phrases = [
    "DATA ENGINEERING",
    "SYSTEM ARCHITECTURE",
    "REAL-TIME STREAMING",
    "CLOUD NATIVE",
    "MACHINE LEARNING",
    "DATA LAKEHOUSE",
  ];

  type StreamItem =
    | { type: "text"; content: string }
    | { type: "icon"; content: TechItem };

  // STREAM 0: Top Outer Edge (Slow, Left)
  const stream0: StreamItem[] = [
    { type: "text", content: phrases[4] },
    { type: "icon", content: techStack[7] }, // Terraform
    { type: "icon", content: techStack[5] }, // Docker
    { type: "text", content: phrases[5] },
    { type: "icon", content: techStack[10] }, // Iceberg
    { type: "icon", content: techStack[0] }, // AWS
  ];

  // STREAM 1: Inner Top (Medium, Right)
  const stream1: StreamItem[] = [
    { type: "text", content: phrases[0] },
    { type: "icon", content: techStack[0] }, // AWS
    { type: "icon", content: techStack[1] }, // Kafka
    { type: "text", content: phrases[1] },
    { type: "icon", content: techStack[3] }, // Snowflake
    { type: "icon", content: techStack[4] }, // Spark
  ];

  // STREAM 2: Center (Fastest, Glowing, Left) - The Main Focal Row
  const stream2: StreamItem[] = [
    { type: "icon", content: techStack[2] }, // Python
    { type: "text", content: phrases[2] },
    { type: "icon", content: techStack[5] }, // Docker
    { type: "icon", content: techStack[6] }, // K8s
    { type: "text", content: phrases[3] },
    { type: "icon", content: techStack[8] }, // Databricks
  ];

  // STREAM 3: Inner Bottom (Medium, Right)
  const stream3: StreamItem[] = [
    { type: "icon", content: techStack[8] }, // Databricks
    { type: "icon", content: techStack[9] }, // Redshift
    { type: "text", content: phrases[0] },
    { type: "icon", content: techStack[10] }, // Iceberg
    { type: "icon", content: techStack[11] }, // Airflow
    { type: "text", content: phrases[1] },
  ];

  // STREAM 4: Bottom Outer Edge (Slowest, Left)
  const stream4: StreamItem[] = [
    { type: "text", content: phrases[3] },
    { type: "icon", content: techStack[1] }, // Kafka
    { type: "icon", content: techStack[4] }, // Spark
    { type: "text", content: phrases[4] },
    { type: "icon", content: techStack[2] }, // Python
    { type: "icon", content: techStack[9] }, // Redshift
  ];
</script>

<div
  class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[hsl(var(--background))]"
>
  <!-- Ambient Light Source -->
  <div class="absolute inset-0 z-0">
    <div
      class="absolute top-[0%] left-[20%] w-[50vw] h-[50vw] bg-[hsl(var(--primary)/0.25)] rounded-full blur-[100px] mix-blend-screen"
    ></div>
    <div
      class="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-[hsl(var(--accent)/0.2)] rounded-full blur-[100px] mix-blend-screen"
    ></div>
  </div>

  <!-- 
    The 3D Isometric Container 
    Height increased to 300vh to comfortably fit 5 streams.
  -->
  <div
    class="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] flex flex-col justify-center gap-16 sm:gap-24 z-10 origin-center"
    style="transform: translate(-50%, -50%) perspective(1000px) rotateX(25deg) rotateY(-5deg) rotateZ(-12deg);"
  >
    <!-- STREAM 0: Top Edge -->
    <div class="marquee-row">
      <div class="marquee-inner animate-scroll-4">
        {#each Array(4) as _}
          <div
            class="flex items-center gap-12 sm:gap-24 px-6 sm:px-12 opacity-50"
          >
            {#each stream0 as item}
              {#if item.type === "text"}
                <span class="frosted-text-white">{item.content}</span>
              {:else}
                <div class="frosted-icon-wrapper scale-90">
                  <img
                    src={item.content.iconUrl}
                    alt={item.content.name}
                    class="frosted-img-white"
                    loading="lazy"
                  />
                </div>
              {/if}
              <span class="separator-white">\\\</span>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <!-- STREAM 1 -->
    <div class="marquee-row">
      <div class="marquee-inner animate-scroll-1">
        {#each Array(4) as _}
          <div
            class="flex items-center gap-12 sm:gap-24 px-6 sm:px-12 opacity-80"
          >
            {#each stream1 as item}
              {#if item.type === "text"}
                <span class="frosted-text-white">{item.content}</span>
              {:else}
                <div class="frosted-icon-wrapper">
                  <img
                    src={item.content.iconUrl}
                    alt={item.content.name}
                    class="frosted-img-white"
                    loading="lazy"
                  />
                </div>
              {/if}
              <span class="separator-white">///</span>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <!-- STREAM 2: Center (The Main Focal Row) -->
    <div class="marquee-row">
      <div class="marquee-inner animate-scroll-2">
        {#each Array(4) as _}
          <div class="flex items-center gap-16 sm:gap-32 px-8 sm:px-16">
            {#each stream2 as item}
              {#if item.type === "text"}
                <span class="frosted-text-white highlight-white"
                  >{item.content}</span
                >
              {:else}
                <div class="frosted-icon-wrapper scale-125">
                  <img
                    src={item.content.iconUrl}
                    alt={item.content.name}
                    class="frosted-img-white highlight-img-white"
                    loading="lazy"
                  />
                </div>
              {/if}
              <span class="separator-white text-white/70">+++</span>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <!-- STREAM 3 -->
    <div class="marquee-row">
      <div class="marquee-inner animate-scroll-3">
        {#each Array(4) as _}
          <div
            class="flex items-center gap-12 sm:gap-24 px-6 sm:px-12 opacity-80"
          >
            {#each stream3 as item}
              {#if item.type === "text"}
                <span class="frosted-text-white">{item.content}</span>
              {:else}
                <div class="frosted-icon-wrapper">
                  <img
                    src={item.content.iconUrl}
                    alt={item.content.name}
                    class="frosted-img-white"
                    loading="lazy"
                  />
                </div>
              {/if}
              <span class="separator-white">:::</span>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <!-- STREAM 4: Bottom Edge -->
    <div class="marquee-row">
      <div class="marquee-inner animate-scroll-5">
        {#each Array(4) as _}
          <div
            class="flex items-center gap-12 sm:gap-24 px-6 sm:px-12 opacity-50"
          >
            {#each stream4 as item}
              {#if item.type === "text"}
                <span class="frosted-text-white">{item.content}</span>
              {:else}
                <div class="frosted-icon-wrapper scale-90">
                  <img
                    src={item.content.iconUrl}
                    alt={item.content.name}
                    class="frosted-img-white"
                    loading="lazy"
                  />
                </div>
              {/if}
              <span class="separator-white">===</span>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Glass Diffuser & Vignette Mask -->
  <div
    class="absolute inset-0 z-20 pointer-events-none"
    style="
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      background: radial-gradient(circle at center, hsl(var(--background)/0.4) 10%, hsl(var(--background)/0.1) 60%, transparent 100%);
    "
  ></div>

  <!-- Bottom fade block for clean scrolling to next section -->
  <div
    class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-30 pointer-events-none"
  ></div>
</div>

<style>
  .marquee-row {
    display: flex;
    width: 100%;
    overflow-x: hidden;
    overflow-y: visible;
  }

  .marquee-inner {
    display: flex;
    flex-shrink: 0;
    width: max-content;
    will-change: transform;
    transform: translateZ(0);
  }

  /* 
    Staggered Animations for 5 Streams 
    Alternating directions and varying speeds.
  */
  .animate-scroll-1 {
    animation: scroll-right 95s linear infinite;
  }
  .animate-scroll-2 {
    animation: scroll-left 70s linear infinite;
  } /* Fastest, Center */
  .animate-scroll-3 {
    animation: scroll-right 105s linear infinite;
  }
  .animate-scroll-4 {
    animation: scroll-left 120s linear infinite;
  } /* Slowest, Outer Top */
  .animate-scroll-5 {
    animation: scroll-left 130s linear infinite;
  } /* Slowest, Outer Bottom */

  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scroll-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  /* PURE WHITE FROSTED TYPOGRAPHY */
  .frosted-text-white {
    font-family: var(--font-sans, "Inter", sans-serif);
    font-size: clamp(5rem, 10vw, 10rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    white-space: nowrap;

    color: rgba(255, 255, 255, 0.15);
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.6);
    text-shadow: 0 4px 30px rgba(255, 255, 255, 0.25);
  }

  /* The Highlight Row */
  .highlight-white {
    color: rgba(255, 255, 255, 0.25);
    -webkit-text-stroke: 3px rgba(255, 255, 255, 1);
    text-shadow:
      0 0 40px rgba(255, 255, 255, 0.5),
      0 0 80px hsl(var(--primary) / 0.4);
  }

  /* Icons */
  .frosted-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(5rem, 10vw, 10rem);
    height: clamp(5rem, 10vw, 10rem);
  }

  /* White-Etched Glass Icons */
  .frosted-img-white {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(100%) brightness(1000%) contrast(1000%);
    opacity: 0.6;
    drop-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .highlight-img-white {
    opacity: 1;
    filter: grayscale(100%) brightness(1000%) contrast(1000%)
      drop-shadow(0 0 40px rgba(255, 255, 255, 0.7));
  }

  /* Separators */
  .separator-white {
    font-family: var(--font-sans, "Inter", sans-serif);
    font-size: clamp(3rem, 6vw, 6rem);
    font-weight: 300;
    color: rgba(255, 255, 255, 0.4);
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .frosted-text-white {
      -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.7);
    }
    .highlight-white {
      -webkit-text-stroke: 2.5px rgba(255, 255, 255, 1);
    }
  }
</style>
