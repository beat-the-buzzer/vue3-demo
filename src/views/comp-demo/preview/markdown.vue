<template>
  <div v-html="html">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';

let str = '# Marked in the browser\n\nRendered by **marked**.\n ```js\nvar a = 1;\n```'
const html = ref('')

onMounted(async () => {
  let trans = marked.parse(str);
  html.value = trans
  await nextTick()
  hljs.highlightAll();
})
</script>
