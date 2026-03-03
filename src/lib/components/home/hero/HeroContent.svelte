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
  <!-- 🖥️ DESKTOP: use heroContent text -->
  <svelte:fragment slot="content-pc">
    <!-- ... VFX flares ... -->

    <div
      class="absolute inset-0 z-20 flex items-center justify-center w-full h-full pointer-events-none"
    >
      <div
        class="w-full max-w-[1400px] px-8 lg:px-16 flex items-center justify-between"
      >
        <DesktopHeader
          name={personal.name}
          prefix={heroContent.headline.prefix}
          suffix={heroContent.headline.suffix}
          metaLabel={heroContent.headline.metaLabelDesktop}
          payloadLabel={heroContent.marquee.payloadLabel}
          {techTags}
        />

        <div
          class="relative z-30 w-2/5 flex flex-col justify-center items-start pointer-events-auto -ml-12"
        >
          <DesktopBioCard
            metaLabel={heroContent.bioCard.metaLabel}
            metaTitle={heroContent.bioCard.metaTitle}
            main={heroContent.bioCard.main}
            details={heroContent.bioCard.details}
          />

          <DesktopActionDock
            cta={heroContent.actionDock.ctaDesktop}
            links={heroContent.actionDock.links}
          />
        </div>
      </div>
    </div>
  </svelte:fragment>

  <!-- 📱 MOBILE: use the same heroContent text -->
  <svelte:fragment slot="content-mobile">
    <div
      class="h-full w-full overflow-y-auto no-scrollbar relative z-20 pointer-events-auto"
    >
      <div
        class="flex flex-col items-center w-full min-h-max px-4 pt-[14vh] pb-[18vh] mx-auto relative"
      >
        <div
          class="absolute top-0 right-[-10%] w-[100vw] h-[100vw] rounded-full
                 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.4)_0%,transparent_70%)]
                 mix-blend-screen pointer-events-none z-0"
        ></div>

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
            {techTags}
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
