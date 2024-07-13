<template>
  <div class="components">
    <input type="file" id="fileId" />
    <Button @click="readZip">读取压缩文件</Button>

    <Table :dataSource="dataList" :columns="columns" :pagination="false" :rowKey="(record, index) => index">
      <template #fileContent="{ record, text }">
        <div v-if="text.indexOf('http') < 0">{{ text }}</div>
        <Button type="link" v-else @click="downloadByUrl({
          url: text,
          fileName: record.fileName.split('/')[1]
        })">下载</Button>
      </template>
    </Table>


  </div>
</template>

<script lang="ts" setup>
import { Button, Table } from "ant-design-vue";
import { reactive, ref, watch, watchEffect, computed, onMounted, nextTick } from "vue";
import JSZip from 'jszip'
import { downloadByUrl } from "/@/utils/file/download";


const dataList = ref([])

const columns = [
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName'
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    key: 'fileType'
  },
  {
    title: '预览（文本或下载链接）',
    dataIndex: 'fileContent',
    slots: { customRender: 'fileContent' },
    key: 'fileContent'
  },
]


function readZip() {
  var file = document.getElementById('fileId')
  if (file && file.files && file.files[0]) {
    dataList.value = []
    let currFile = file.files[0]
    let jszip = new JSZip()

    jszip.loadAsync(currFile).then(res => {
      console.log(res) // 目录以及里面的内容
      for (let key in res.files) {
        let fileItem = res.files[key]
        if (!fileItem.dir && fileItem.name.indexOf('__MACOSX') < 0) {
          // 这里就能拿到
          if ((/\.(png|jpg|jpeg|webp|gif)$/).test(fileItem.name)) {
            // png图片
            res.file(fileItem.name)?.async('blob').then(data => {
              dataList.value.push({
                fileName: fileItem.name,
                fileType: '图片',
                fileContent: URL.createObjectURL(data),
              })
            })
          }
          if ((/\.md$/).test(fileItem.name)) {
            // png图片
            res.file(fileItem.name)?.async('string').then(data => {
              dataList.value.push({
                fileName: fileItem.name,
                fileType: 'markdown',
                fileContent: data,

              })
            })
          }
          if ((/\.pdf$/).test(fileItem.name)) {
            // png图片
            res.file(fileItem.name)?.async('blob').then(data => {
              dataList.value.push({
                fileName: fileItem.name,
                fileType: 'pdf',
                fileContent: URL.createObjectURL(data),

              })
            })
          }
        }
      }
    })
  } else {
    console.log('文件不存在，请先上传压缩文件')
  }

}

</script>
