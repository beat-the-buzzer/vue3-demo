<template>
  <div>
    <embed src="/resource/pdf/preview.pdf"></embed>
    <!-- <VuePdfEmbed annotation-layer text-layer :source="pdfSource" /> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
// essential styles
// import 'vue-pdf-embed/dist/style/index.css'

// const pdfSource = 'http://localhost:3100/resource/pdf/preview.pdf'

</script>
