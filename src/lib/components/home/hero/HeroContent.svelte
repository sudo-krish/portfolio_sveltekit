<script lang="ts">
  import { siteConfig } from "$lib/data/site";
  import { heroContent, heroProfile } from "$lib/data/hero_content";
  import { onMount } from "svelte";
  import gsap from "gsap";

  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

  import DesktopHeader from "./desktop/DesktopHeader.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import DesktopActionDock from "./desktop/DesktopActionDock.svelte";
  import { TerminalSquare } from "lucide-svelte";

  import MobileHeader from "./mobile/MobileHeader.svelte";
  import MobileBioCard from "./mobile/MobileBioCard.svelte";
  import MobileActionDock from "./mobile/MobileActionDock.svelte";

  const personal = {
      ...siteConfig,
      ...heroProfile,
      website: siteConfig.baseUrl
  };
  const techTags = personal.topSkills;
</script>



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
      class="absolute inset-0 z-20 w-full h-full pointer-events-none flex justify-center overflow-hidden"
      style="container-type: size; padding-left: 3cqi; padding-right: 3cqi;"
    >
      <div class="relative w-full h-full max-w-none">
        <!-- Main Content Grid -->
        <div
          class="w-full h-full grid grid-cols-12 items-center"
          style="gap: 2cqi; padding-bottom: 4cqi;"
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
          <div
            class="col-span-6 col-start-7 relative z-30 flex flex-col justify-center items-start pointer-events-auto"
          >
            <SectionCard
              badge={heroContent.bioCard.metaLabel}
              subtitle={heroContent.bioCard.metaTitle}
              Icon={TerminalSquare}
              shortDescription={heroContent.bioCard.main}
              detailedPhilosophy={heroContent.bioCard.details}
            />
          </div>
        </div>

        <!-- 3. Action Dock: Center Bottom -->
        <div
          class="absolute left-1/2 -translate-x-1/2 z-40 w-full pointer-events-auto flex justify-center"
          style="bottom: 3cqi; max-width: 30cqi;"
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
      class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
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
