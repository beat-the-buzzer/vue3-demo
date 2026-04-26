<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" @ok="handleSubmit" :showFooter="true" :destroy-on-close="true"
    :title="getTitle" width="500px">
    <BasicForm @register="registerForm" />

  </BasicDrawer>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick, reactive, createVNode } from 'vue';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { BasicForm, useForm } from '/@/components/Form/index';
import { useMessage } from '/@/hooks/web/useMessage';
import { useModal } from '/@/components/Modal';
import { Modal, Switch, FormItem, Input, Tag } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
const { createMessage } = useMessage();
const emit = defineEmits(['register', 'success']);
import { cloneDeep } from 'lodash-es';
import { formSchemas } from './index.data'
import { addBl, modifyBlById } from '/@/api/jwlc/index.ts'
import { getUrlParam } from '/@/assets/js/common.js';
const ywdm = getUrlParam('ywdm')

const getTitle = computed(() => {
  return isEdit.value ? '编辑' : '新增'
})

const isEdit = ref(false)
let record = {}

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  isEdit.value = !!data.isEdit
  if(isEdit.value) {
    record = data.record
    setFieldsValue({
      ...record
    })
  } else {
    record = {}
  }
  
});


const [registerForm, { resetFields, setFieldsValue, getFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 120,
    schemas: formSchemas,
    showActionButtonGroup: false,
  });


async function handleSubmit() {
  let values = await validate()
  let params = {
    ...values,
    ywdm
  }
  if(isEdit.value) {
    // 调用编辑的接口
    await modifyBlById({
      ...params,
      id: record?.id
    })
  } else {
    // 调用新增的接口
    await addBl(params)
  }
  createMessage.success(`${getTitle.value}成功`)
  emit('success')
  closeDrawer()
}


</script>

