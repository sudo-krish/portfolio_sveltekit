<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import { getPersonalInfo, getAllCompanies, getEducation, getCertifications } from '$lib/data/portfolio-data';
    import { Mail, Linkedin, Github, Instagram, MapPin, Briefcase, GraduationCap, Award, ArrowLeft, ExternalLink, Download } from 'lucide-svelte';

    const personal = getPersonalInfo();
    const companies = getAllCompanies();
    const education = getEducation();
    const certs = getCertifications();
</script>

<svelte:head>
    <title>About — {personal.name}</title>
    <meta name="description" content={personal.shortBio} />
</svelte:head>

<div class="min-h-screen bg-background">
    <!-- Ambient glow -->
    <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-primary"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-5 bg-primary"></div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <!-- Back link -->
        <a href="/"
           class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
                  transition-colors duration-200 mb-10 group">
            <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform duration-200" />
            <span class="font-mono text-xs uppercase tracking-wider">Home</span>
        </a>

        <!-- Hero section -->
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-16">
            <!-- Avatar -->
            <div class="shrink-0">
                <div class="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-border
                            shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <img src="https://github.com/sudo-krish.png" alt={personal.name}
                         class="w-full h-full object-cover" />
                    <div class="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background
                                shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                </div>
            </div>

            <!-- Info -->
            <div class="flex-1">
                <h1 class="text-4xl sm:text-5xl font-black text-foreground tracking-tighter leading-tight mb-2">
                    {personal.name}
                </h1>
                <p class="text-lg text-primary font-mono font-bold tracking-tight mb-4">
                    {personal.jobTitle}
                </p>
                <p class="text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
                    {personal.shortBio}
                </p>

                <!-- Location + Quick links -->
                <div class="flex flex-wrap gap-3">
                    <span class="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
                        <MapPin size={14} />
                        {personal.address.city}, {personal.address.country}
                    </span>
                    <a href="mailto:{personal.email}"
                       class="inline-flex items-center gap-1.5 text-sm text-foreground bg-primary/10 px-3 py-1.5 rounded-lg
                              border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors">
                        <Mail size={14} />
                        Email Me
                    </a>
                    <a href={personal.socialLinks.linkedin} target="_blank" rel="noopener"
                       class="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg
                              border border-border/30 hover:border-primary/30 hover:text-primary transition-colors">
                        <Linkedin size={14} />
                        LinkedIn
                    </a>
                    <a href={personal.socialLinks.github} target="_blank" rel="noopener"
                       class="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg
                              border border-border/30 hover:border-primary/30 hover:text-primary transition-colors">
                        <Github size={14} />
                        GitHub
                    </a>
                    {#if personal.resumeUrl}
                        <a href={personal.resumeUrl} target="_blank" rel="noopener"
                           class="inline-flex items-center gap-1.5 text-sm text-foreground bg-primary/10 px-3 py-1.5 rounded-lg
                                  border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors">
                            <Download size={14} />
                            Resume
                        </a>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- About -->
            <div class="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Briefcase size={18} class="text-primary" />
                    About
                </h2>
                <p class="text-sm text-muted-foreground leading-relaxed">
                    {personal.bio}
                </p>
            </div>

            <!-- Top Skills -->
            <div class="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Award size={18} class="text-primary" />
                    Core Strengths
                </h2>
                <div class="flex flex-col gap-2">
                    {#each personal.topSkills as skill}
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"></div>
                            <span class="text-sm text-foreground/80">{skill}</span>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Experience timeline -->
            <div class="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)] lg:col-span-2">
                <h2 class="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <Briefcase size={18} class="text-primary" />
                    Experience
                </h2>
                <div class="space-y-6">
                    {#each companies as company}
                        <div class="relative pl-6 border-l-2 border-primary/20">
                            <div class="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary
                                        {company.current ? 'shadow-[0_0_10px_hsl(var(--primary))]' : ''}"></div>
                            <div class="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                                <h3 class="text-base font-bold text-foreground">{company.position}</h3>
                                <span class="text-xs font-mono text-muted-foreground">{company.duration}</span>
                            </div>
                            <a href={company.url} target="_blank" rel="noopener"
                               class="text-sm text-primary/80 hover:text-primary inline-flex items-center gap-1 mb-2 transition-colors">
                                {company.name}
                                <ExternalLink size={12} />
                            </a>
                            <p class="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Education -->
            <div class="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <GraduationCap size={18} class="text-primary" />
                    Education
                </h2>
                {#each education as edu}
                    <div>
                        <h3 class="text-base font-bold text-foreground">{edu.degree}</h3>
                        <p class="text-sm text-primary/80">{edu.field}</p>
                        <p class="text-sm text-muted-foreground mt-1">{edu.university} — {edu.graduationYear}</p>
                        {#if edu.gpa}
                            <p class="text-xs font-mono text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- Certifications -->
            <div class="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Award size={18} class="text-primary" />
                    Certifications
                </h2>
                <div class="space-y-3">
                    {#each certs as cert}
                        <a href={cert.url} target="_blank" rel="noopener"
                           class="block p-3 rounded-xl bg-muted/20 border border-border/20
                                  hover:border-primary/30 transition-colors group">
                            <h3 class="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                {cert.name}
                            </h3>
                            <p class="text-xs text-muted-foreground mt-0.5">{cert.issuer} — {cert.dateIssued}</p>
                        </a>
                    {/each}
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div class="mt-16 text-center">
            <div class="rounded-2xl bg-card/60 backdrop-blur-xl border border-primary/20 p-8
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <h2 class="text-2xl font-black text-foreground tracking-tight mb-2">Let's Build Something Together</h2>
                <p class="text-muted-foreground mb-6">Open to new opportunities, collaborations, and interesting conversations.</p>
                <a href="mailto:{personal.email}"
                   class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl
                          font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_4px_20px_hsl(var(--primary)/0.4)]">
                    <Mail size={16} />
                    Get in Touch
                </a>
            </div>
        </div>
    </div>
</div>
