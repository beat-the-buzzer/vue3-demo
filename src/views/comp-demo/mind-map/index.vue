<template>
  <PageWrapper title="思维导图组件">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1"> </span>
      </div>
    </template>

    <tiny-mind-map
      class="demo-mind-map-export-date"
      ref="mindmap"
      @create="onCreate"
      v-model="exampleData"
    />
  </PageWrapper>
</template>

<script setup>
  import { PageWrapper } from '/@/components/Page';
  import { MindMap as TinyMindMap, Button as TinyButton, Modal } from '@opentiny/vue';
  import { ref } from 'vue';

  const render = ref(null);
  const exampleData = ref({
    nodeData: {
      id: 'root',
      topic: '根节点',
      root: true,
      children: [
        {
          topic: '中国（100分）',
          id: '1',
          children: [
            {
              topic: '北京（100分）',
              id: '1-1',
            },
            {
              topic: '上海（100分）',
              id: '1-2',
            },
          ],
        },
        {
          topic: '日本（-100分）',
          id: '2',
          children: [
            {
              topic: '广岛（-100分）',
              id: '2-1',
            },
            {
              topic: '长崎（-100分）',
              id: '2-2',
            },
          ],
        },
      ],
    },
  });
  const loading = ref(false);
  const onCreate = (instance) => {
    render.value = instance;
  };
  const exportData = () => {
    if (render.value) {
      Modal.message({ message: '数据已经输出于控制台, 请打开控制台查看', status: 'info' });

      console.log(render.value.getData());
    }
  };
  const importData = () => {
    if (render.value) {
      const fn = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (render.value) {
              render.value.init(exampleData.value);
            }
            resolve(null);
          }, 1000);
        });
      };
      loading.value = true;
      fn().finally(() => (loading.value = false));
    }
  };
  const clearData = () => {
    loading.value = true;
    const clearNodeData = {
      nodeData: {
        id: 'c9ee6647385c42de',
        topic: '我的子节点被清空啦~',
        root: true,
        children: [],
      },
    };
    try {
      render.value.init(clearNodeData);
      render.value.refresh(clearNodeData);
    } finally {
      loading.value = false;
    }
  };
</script>

<style scoped>
  .demo-mind-map-export-date {
    width: 100%;
    height: 400px;
    margin-top: 10px;
  }
</style>
