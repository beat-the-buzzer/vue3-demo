<template>
  <PageWrapper title="表格合并">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="行合并">
        <merge1></merge1>
      </a-tab-pane>
      <a-tab-pane key="2" tab="相邻列同数据合并">
        <merge2></merge2>
      </a-tab-pane>
      <a-tab-pane key="3" tab="相邻行统数据合并">
        <merge3></merge3>
      </a-tab-pane>
    </a-tabs>


  </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { Input, Button, Tabs } from "ant-design-vue";
import { ref, watch, watchEffect, computed, onMounted } from "vue";
import merge1 from './components/merge1.vue';
import merge2 from './components/merge2.vue';
import merge3 from './components/merge3.vue';

const ATabs = Tabs
const ATabPane = Tabs.TabPane

const activeKey = ref('1')

</script>

<style lang="css"></style>
