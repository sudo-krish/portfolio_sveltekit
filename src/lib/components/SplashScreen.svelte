<!-- src/lib/components/SplashScreen.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { splashComplete } from "$lib/stores/splash";
  import { TerminalSquare } from "lucide-svelte";

  let visible = true;
  let fadeOut = false;
  let currentPhraseIndex = 0;

  // Witty, data-engineer focused loading phrases
  const phrases = [
    "Waking up the hamsters...",
    "Untangling spaghetti pipelines...",
    "Querying the void...",
    "Bribing the AWS algorithms...",
    "Normalizing the chaos...",
    "Extracting, transforming, loading...",
    "Compiling awesomeness...",
  ];

  onMount(() => {
    // Quickly cycle through phrases to give a "terminal processing" feel
    const phraseInterval = setInterval(() => {
      if (currentPhraseIndex < phrases.length - 1) {
        currentPhraseIndex++;
      }
    }, 450);

    // Total splash duration is ~3.5 seconds
    const totalDuration = setTimeout(() => {
      clearInterval(phraseInterval);
      completeSplash();
    }, 3500);

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(totalDuration);
    };
  });

  function completeSplash() {
    fadeOut = true;
    setTimeout(() => {
      visible = false;
      splashComplete.set(true);
    }, 600); // Matches the CSS transition duration
  }

  // Allow impatient users to skip immediately
  function skipSplash() {
    completeSplash();
  }
</script>

{#if visible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="splash-screen" class:fade-out={fadeOut} on:click={skipSplash}>
    <div class="splash-container">
      <!-- CENTERED LOGO GROUP -->
      <div class="logo-group">
        <!-- Base Image Container -->
        <div class="image-container">
          <img src="/logo.jpg" alt="Profile" class="base-img" />

          <!-- Animated Clear Water Bubble overlapping the image -->
          <div class="water-bubble">
            <!-- Glare/Reflections on the bubble -->
            <div class="bubble-glare-top"></div>
            <div class="bubble-glare-bottom"></div>
          </div>
        </div>

        <!-- Minimalist 'K' Logo -->
        <div class="logo-wrapper">
          <span class="logo-text">K.</span>
          <div class="blinking-cursor"></div>
        </div>
      </div>

      <!-- Witty Loading Text Sequence -->
      <div class="text-wrapper">
        <div class="terminal-header">
          <TerminalSquare size={14} class="opacity-70" />
          <span
            class="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
            >System Boot</span
          >
        </div>

        <div class="phrase-container">
          {#key currentPhraseIndex}
            <p class="phrase-text">
              > {phrases[currentPhraseIndex]}
            </p>
          {/key}
        </div>
      </div>

      <!-- Subtle skip hint -->
      <p class="skip-hint">Click anywhere to skip</p>
    </div>
  </div>
{/if}

<style>
  .splash-screen {
    position: fixed;
    inset: 0;
    background: #09090b;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
    transition: opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .splash-screen.fade-out {
    opacity: 0;
    pointer-events: none;
  }

  .splash-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    width: 100%;
    max-width: 400px;
    padding: 0 2rem;
  }

  .logo-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  /* --- Water Bubble Image Container --- */
  .image-container {
    position: relative;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: dropIn 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  /* The actual image, slightly smaller than the container so the bubble overlaps it */
  .base-img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
    /* Keep it crisp and clear */
    filter: brightness(1) contrast(1.05);
    z-index: 0;
    /* Soft shadow to ground the image */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }

  /* The animated water droplet that sits ON TOP and OVERLAPS the image */
  .water-bubble {
    position: absolute;
    /* Bubble is larger (110px) than the image (70px) */
    width: 110px;
    height: 110px;
    border-radius: 50%;
    z-index: 10;

    /* Very clear glass: almost no blur, just light refraction */
    backdrop-filter: blur(0.5px) contrast(1.1);
    -webkit-backdrop-filter: blur(0.5px) contrast(1.1);

    /* Crystal clear gradient that creates the edge of the bubble */
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.05) 80%,
      rgba(255, 255, 255, 0.2) 100%
    );

    /* Inner light reflections for the glass edges */
    box-shadow:
      inset 2px 2px 5px rgba(255, 255, 255, 0.4),
      inset -4px -4px 6px rgba(255, 255, 255, 0.1),
      0 4px 15px rgba(0, 0, 0, 0.3); /* Soft shadow casting off the bubble */

    /* Floating liquid animation */
    animation: floatBubble 4s ease-in-out infinite;
  }

  /* Top curved white reflection */
  .bubble-glare-top {
    position: absolute;
    top: 10%;
    left: 20%;
    width: 45%;
    height: 20%;
    border-radius: 50%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(-30deg);
    filter: blur(1px);
    pointer-events: none;
  }

  /* Bottom subtle reflection */
  .bubble-glare-bottom {
    position: absolute;
    bottom: 12%;
    right: 15%;
    width: 20%;
    height: 10%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    filter: blur(2px);
    transform: rotate(45deg);
    pointer-events: none;
  }

  /* --- Logo Styles --- */
  .logo-wrapper {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 4px;
    animation: slideDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both;
  }

  .logo-text {
    font-family: var(--font-sans);
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    color: hsl(var(--foreground));
    letter-spacing: -0.05em;
  }

  .blinking-cursor {
    width: 20px;
    height: 10px;
    background-color: hsl(var(--accent));
    animation: blink 1s step-end infinite;
    box-shadow: 0 0 10px hsl(var(--accent) / 0.5);
  }

  /* --- Typography & Text Styles --- */
  .text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both;
  }

  .terminal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: hsl(var(--muted-foreground));
  }

  .phrase-container {
    height: 1.5rem;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .phrase-text {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: hsl(var(--foreground) / 0.8);
    margin: 0;
    white-space: nowrap;
    text-align: center;
    animation: typeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .skip-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: hsl(var(--muted-foreground) / 0.4);
    animation: pulseSlow 3s infinite ease-in-out;
  }

  /* --- Animations --- */
  /* This gives the bubble its organic, floating/breathing feeling */
  @keyframes floatBubble {
    0%,
    100% {
      transform: translateY(0) scale(1);
      border-radius: 50%;
    }
    33% {
      transform: translateY(-4px) scale(1.02);
      border-radius: 52% 48% 51% 49% / 51% 49% 52% 48%; /* Organic morphing */
    }
    66% {
      transform: translateY(3px) scale(0.98);
      border-radius: 49% 51% 48% 52% / 48% 52% 49% 51%; /* Organic morphing */
    }
  }

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: scale(0.5) translateY(-40px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @keyframes pulseSlow {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
  }
</style>
