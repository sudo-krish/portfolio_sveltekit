<!-- src/lib/components/home/CertificationsCard.svelte -->
<script lang="ts">
  import { Award, Shield, CheckCircle, ExternalLink } from 'lucide-svelte';
  import { getCertifications } from '$lib/data/portfolio-data';
  
  const certifications = getCertifications().slice(0, 3);
</script>

<div class="relative w-full h-full min-h-[300px] flex flex-col rounded-xl border border-white/10 bg-background/40 backdrop-blur-md overflow-hidden group">
  
  <!-- Header: Credential Wallet -->
  <div class="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Award size={18} />
        </div>
        <div>
            <h3 class="text-sm font-bold text-foreground tracking-tight">Cloud Credentials</h3>
            <div class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">AWS Certified</div>
        </div>
    </div>
    
    <div class="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1.5">
        <CheckCircle size={10} class="text-green-400" />
        <span class="text-[9px] font-bold text-green-400 tracking-wider uppercase">Verified</span>
    </div>
  </div>

  <!-- Body: Cert List -->
  <div class="flex-1 p-4 flex flex-col gap-3 overflow-y-auto relative z-10">
    {#each certifications as cert}
      <a 
        href={cert.url} 
        target="_blank" 
        class="group/item relative flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300"
      >
        <!-- Left Color Strip -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/50 rounded-l-lg opacity-50 group-hover/item:opacity-100 group-hover/item:bg-orange-400 transition-all"></div>

        <!-- Badge Icon -->
        <div class="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded bg-background/50 border border-white/10 group-hover/item:border-orange-500/30 transition-colors">
             <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" class="w-6 h-6 object-contain opacity-80 group-hover/item:opacity-100" />
        </div>

        <!-- Text Info -->
        <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-foreground group-hover/item:text-orange-100 truncate transition-colors">
                {cert.name.replace('AWS Certified ', '')}
            </h4>
            <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[10px] font-mono text-orange-400/80">{cert.category}</span>
                <span class="text-[10px] text-muted-foreground">•</span>
                <span class="text-[10px] text-muted-foreground">{cert.dateIssued}</span>
            </div>
        </div>

        <!-- External Link Icon -->
        <ExternalLink size={14} class="text-muted-foreground opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
        
      </a>
    {/each}
  </div>

  <!-- Footer -->
  <div class="px-5 py-3 border-t border-white/5 bg-white/5 flex items-center gap-2 text-[10px] text-muted-foreground">
      <Shield size={10} class="text-orange-400" />
      <span>Cryptographically signed by Amazon Web Services</span>
  </div>

</div>
