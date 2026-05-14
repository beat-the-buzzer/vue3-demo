<template>
  <PageWrapper title="hooks">
    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
    />
    <a-button @click="doPreview">预览（公共组件）</a-button>

    <!--加一个hooks的功能-->
   <filePreview />
  </PageWrapper>


</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { Button } from "ant-design-vue";
import UploadPreviewModal from '/@/components/Upload/src/UploadPreviewModal.vue';
import { ref, markRaw } from "vue";
import filePreview from './filePreview.vue'
const AButton = Button;
import { useModal } from '/@/components/Modal';

const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();

const fileList = ref([])

function doPreview() {
  fileList.value = ['test.pdf'] // 这里做赋值操作
  openPreviewModal(true, {})
}


</script>

<style lang="css">

</style>
