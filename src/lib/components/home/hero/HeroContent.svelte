<script lang="ts">
  import { getPersonalInfo } from "$lib/data/portfolio-data";
  import { heroContent } from "$lib/data/hero_content";
  import { onMount } from "svelte";
  import gsap from "gsap";

  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

  import DesktopHeader from "./desktop/DesktopHeader.svelte";
  import DesktopBioCard from "./desktop/DesktopBioCard.svelte";
  import DesktopActionDock from "./desktop/DesktopActionDock.svelte";

  import MobileHeader from "./mobile/MobileHeader.svelte";
  import MobileBioCard from "./mobile/MobileBioCard.svelte";
  import MobileActionDock from "./mobile/MobileActionDock.svelte";

  const personal = getPersonalInfo();
  const techTags = personal.topSkills;
</script>

<svelte:head>
  <title>{personal.name} | Senior Data Engineer</title>
  <meta name="description" content={personal.shortBio} />
  <meta
    name="keywords"
    content="Senior Data Engineer, AWS Expert, Real-Time Data pipelines, Apache Kafka, Data Architect, {personal.name}, Data Engineering Portfolio"
  />
  <meta property="og:title" content="{personal.name} | Senior Data Engineer" />
  <meta property="og:description" content={personal.shortBio} />
  <meta property="og:type" content="website" />
</svelte:head>

<MobileCarousel
  layout="left"
  sectionTitle={heroContent.identity.sectionTitle}
  sectionDescription={heroContent.identity.sectionDescription}
  accentColor="hsl(var(--primary))"
>
  <!-- 🖥️ DESKTOP: Wide Split Canvas -->
  <svelte:fragment slot="content-pc">
    <!-- ... VFX flares ... -->

    <!-- We use padding to define the outermost boundaries -->
    <div
      class="absolute inset-0 z-20 w-full h-full pointer-events-none flex justify-center px-10 xl:px-20 2xl:px-32 overflow-hidden"
    >
      <!-- max-w-none lets it use all available screen real estate up to the padding -->
      <div class="relative w-full h-full max-w-none">
        <!-- Main Content Grid -->
        <!-- pb-32 pushes the grid up so the bottom action dock has room -->
        <div
          class="w-full h-full grid grid-cols-12 gap-12 xl:gap-20 items-center pb-32"
        >
          <!-- 1. Header: Completely Left (Spans cols 1 to 5) -->
          <div
            class="col-span-6 xl:col-span-5 flex flex-col justify-center items-start pointer-events-auto z-10 w-full"
          >
            <DesktopHeader
              name={personal.name}
              prefix={heroContent.headline.prefix}
              suffix={heroContent.headline.suffix}
              metaLabel={heroContent.headline.metaLabelDesktop}
              payloadLabel={heroContent.marquee.payloadLabel}
              techStack={heroContent.marquee.techStack}
            />
          </div>

          <!-- 2. Bio Card: Mid to Right -->
          <!-- col-start-7 starts the card exactly at the 50% line of the screen -->
          <div
            class="col-span-6 col-start-7 relative z-30 flex flex-col justify-center items-start pointer-events-auto"
          >
            <DesktopBioCard
              metaLabel={heroContent.bioCard.metaLabel}
              metaTitle={heroContent.bioCard.metaTitle}
              main={heroContent.bioCard.main}
              details={heroContent.bioCard.details}
            />
          </div>
        </div>

        <!-- 3. Action Dock: Center Bottom -->
        <!-- Anchored independently in the bottom center -->
        <div
          class="absolute bottom-10 xl:bottom-12 left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] pointer-events-auto flex justify-center"
        >
          <DesktopActionDock
            cta={heroContent.actionDock.ctaDesktop}
            links={heroContent.actionDock.links}
          />
        </div>
      </div>
    </div>
  </svelte:fragment>
  <!-- 📱 MOBILE: Fixed Scroll Chaining -->
  <svelte:fragment slot="content-mobile">
    <div
      class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar relative z-20 pointer-events-auto"
    >
      <div
        class="flex flex-col items-center w-full min-h-max px-4 pt-[14vh] pb-[18vh] mx-auto relative"
      >
        <div class="w-full flex flex-col items-center relative z-10">
          <MobileHeader
            prefix={heroContent.headline.prefix}
            suffix={heroContent.headline.suffix}
            metaLabel={heroContent.headline.metaLabelMobile}
            name={personal.name}
          />

          <MobileBioCard
            metaLabel={heroContent.bioCard.metaLabel}
            metaTitle={heroContent.bioCard.metaTitle}
            main={heroContent.bioCard.main}
            details={heroContent.bioCard.details}
            techStack={heroContent.marquee.techStack}
          />

          <MobileActionDock
            cta={heroContent.actionDock.cta}
            links={heroContent.actionDock.links}
          />
        </div>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
