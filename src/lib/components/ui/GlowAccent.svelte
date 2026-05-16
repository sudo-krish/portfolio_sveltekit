<script lang="ts">
    let {
        color = "",
        position = "",
        size = 0
    } = $props<{
        color?: string;
        position?: string;
        size?: number;
    }>();
</script>

<!-- GlowAccent disabled for pure monochrome -->
