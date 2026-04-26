<template>
  <div style="padding: 16px 20px">
    <div class="title">流程图</div>
    <div>
      <a-tabs v-model:activeKey="activeKey" tab-position="left" :style="{ width: '100%' }">
        <a-tab-pane tab="流程设计" key="lcsj">
          <Lcsj />
        </a-tab-pane>
        <a-tab-pane tab="流程配置" key="lcpz">
          <Lcpz v-if="activeKey == 'lcpz'"/>
          <!--加了v-if之后，每次点击都会重新请求（因为流程结构可能会变，变量有可能会更新）-->
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, createVNode, unref, nextTick } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import { Modal, Tabs, Table } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
const { createMessage, createErrorModal } = useMessage();

import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'


import Lcsj from './Lcsj.vue'
import Lcpz from './Lcpz.vue'

const ATabs = Tabs;
const ATabPane = Tabs.TabPane;

const activeKey = ref('lcsj');



</script>

<style lang="less" scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 16px;
}
</style>


