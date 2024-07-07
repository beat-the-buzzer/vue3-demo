<template>
  <PageWrapper title="预览组件">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="PDF">
        <pdf></pdf>
      </a-tab-pane>
      <a-tab-pane key="2" tab="MarkDown">
        <markdown></markdown>
      </a-tab-pane>
      <a-tab-pane key="3" tab="zip">
        zip预览组件
      </a-tab-pane>
    </a-tabs>

  </PageWrapper>


</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { Input, Button, Tabs } from "ant-design-vue";
import { ref, watch, watchEffect, computed, onMounted } from "vue";
import markdown from './markdown.vue';
import pdf from './pdf.vue'
import VuePdfEmbed from 'vue-pdf-embed'

const ATabs = Tabs
const ATabPane = Tabs.TabPane

const activeKey = ref('1')

</script>

<style lang="css">
</style>
