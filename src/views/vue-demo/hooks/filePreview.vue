<template>
  <div>
    <UploadPreviewModal
      :value="curFileList"
      @register="registerPreviewModal"
    />
    <a-button @click="doPreview">预览（hooks用法）</a-button>
  </div>
</template>

<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref } from "vue";

const AButton = Button;

// hooks的用法
import { useFilePreview } from '/@/hooks/component/useFilePreview';
const { curFileList, openFileModal, registerPreviewModal, UploadPreviewModal } = useFilePreview(); // 附件预览

function doPreview() {
  openFileModal(['test-hooks.pdf']) // 这里做赋值操作)
}

</script>
