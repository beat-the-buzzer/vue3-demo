<template>
  <PageWrapper title="前端文件">
    <input type="file" id="fileId" />

    <div>上传完文件后，查看控制台</div>

    <a-button @click="doClick">点击后查看控制台</a-button>

    
  </PageWrapper>


</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { Input, Button, Tabs } from "ant-design-vue";
import { ref, watch, watchEffect, computed, onMounted } from "vue";


function getFile() {
  var file = document.getElementById('fileId')
  return file.files[0]
}

function doClick() {
  var fileObj = getFile() // 这个是file对象
  console.log('file对象', fileObj)
  console.log('fileObj instanceof File：', fileObj instanceof File)
  console.log('fileObj instanceof Blob：', fileObj instanceof Blob) // File是继承自Blob的

  let blobObj = new Blob([fileObj], {
    type: fileObj.type
  })

  console.log('blob对象', blobObj)

  blobObj.arrayBuffer().then(bufferObj => {
    console.log('按照arrayBuffer读取：', bufferObj)
    let dataView = new DataView(bufferObj)
    console.log('dataView对象', dataView)
  })
  blobObj.text().then(res => console.log('按照文本读取：', res))
  console.log('按照流读取', blobObj.stream())
  blobObj.slice(0, 1).text().then(res => console.log('切割一位的结果：', res))

  let url1 = URL.createObjectURL(fileObj) // 也可以用于File对象
  let url2 = URL.createObjectURL(blobObj)
  console.log('内存链接，可以试试上传图片，再用浏览器打开', url1, url2) 

  let fileRead = new FileReader()
  console.log('fileRead对象', fileRead)
  // fileRead.readAsText(blobObj) // 文本
  // fileRead.readAsDataURL(blobObj) // base64
  // fileRead.readAsArrayBuffer(blobObj) // ArrayBuffer
  // fileRead.abort() // 中断读取操作
}




</script>

<style lang="css">
</style>
