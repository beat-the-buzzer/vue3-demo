<template>
  <span class="text">
    {{ dataObj.topic }}
    <a-button class="btn" type="link" @click="doEdit">编辑</a-button>
  </span>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Button } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
const AButton = Button
const emit = defineEmits(['success'])
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => { }
  }
})
function doEdit() {
  createMessage.success('编辑按钮被点击了，打印一下传过来的属性' + JSON.stringify(props.dataObj))
  // console.log('编辑按钮被点击了，打印一下传过来的属性', props.dataObj)
  emit('success')
}
</script>
<style scoped lang="less">
.btn {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
}
</style>