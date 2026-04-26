<template>
  <div style="display: flex;">
    <div class="fm2-main-content">
      <div>
        <div class="containers">
          <div class="canvas" ref="canvas" id="bpmnCanvas1" tabindex="0" />
        </div>
      </div>
    </div>
    
    <div style="width: 350px;background-color: #f5f5f5;padding: 16px;">
      <Alert message="请选择节点设置属性" />
      
    </div>


  </div>
</template>
  
<script lang="ts" setup>
import { ref, shallowRef, reactive, createVNode, watch, onMounted } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import { Modal, Tabs, Table, Alert } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
const { createMessage, createErrorModal } = useMessage();
// import BpmnModeler from 'bpmn-js/lib/Modeler'
import BpmnModeler from 'bpmn-js/lib/Viewer' // 注意这里是预览模式
import { BasicForm, useForm } from '/@/components/Form/index';
import { RightOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es'
import lintModule from 'bpmn-js-bpmnlint'
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import customTranslate from './translate/Translate.js'
import customModule from './custom'
import activiti from './bpmn-js-properties-panel/static/flowModel/activiti.json'
import BpmData from './resources/BpmData'
import newXml from './resources/newDiagram.js'



// import bpmnlintConfig from './.bpmnlintrc'
const canvas = ref(null)
const bpmnModeler = shallowRef(null)
const bpmData = new BpmData()
const bpmnlintActive = ref(false)
const importParseComplete = ref(true)

const modelData = reactive({
  id: 'xxx',
  key: 'xxx',
  name: '初始化',
  category: 'xxx',
  description: 'description_1'
})

const process = reactive({
  xml: '',
  svg: ''
})

const currNode = ref('')

// watch(() => currNode.value, (val) => {
//   console.log(val)
// })

function handleModeler() {
  // var eventBus = this.modeler.get('eventBus')
  // // 第一次渲染时修改图的大小
  // this.modeler.on('commandStack.shape.create.preExecute', (e) => {
  //   changeElementSize(e.context.shape)
  // })

  // this.modeler.on('commandStack.shape.create.execute', (e) => {})

  // 监听节点选择变化
  bpmnModeler.value.on('selection.changed', (e) => {
    const element = e.newSelection[0]
    // console.log('节点选择变化', element)
    if (element) {
      // 修改当前节点
      currNode.value = {
        id: element.id,
        type: element.type
      }

      if(element.type == 'bpmn:UserTask') {
        // 调用接口获取数据
        // getNodeDetail(element.id)
      }

      if(element.type == 'bpmn:ExclusiveGateway') {
        // getGatewayDetail(element.id)
      }
    } else {
      currNode.value = null
    }
  })
}





function createNewDiagram(xml) {
  let originalXML = process.xml
  if (!xml) {
    // 初始化XML文本
    process.xml = newXml(
      modelData.key,
      modelData.name,
      modelData.category,
      modelData.description
    )
  } else {
    //this.process.xml = this.encodeCDATA(xml)
    process.xml = xml
  }
  // 将字符串转换成图显示出来
  bpmnModeler.value
    .importXML(process.xml)
    .then((err, msg) => {
      if (originalXML) {
        //不是初始化，是导入的情况
        // this.$message.success(type === 'clear' ? '清空成功' : '导入成功!')
      }

      if (err.warnings.length > 0) {
        //  console.error(err);
      }
    })
    .catch(() => {
      // this.$message.error('文件错误!')
    })
}

async function init() {
  // 生成实例
  bpmnModeler.value = new BpmnModeler({
    container: canvas.value,
    // linting: {
    //   // bpmnlint: bpmnlintConfig,
    //   active: bpmnlintActive.value
    // },
    // additionalModules: [
    //   customModule,
    //   lintModule,
    //   //  propertiesPanelModule,
    //   //propertiesProviderModule,
    //   {
    //     translate: ['value', customTranslate]
    //   }
    // ],
    // moddleExtensions: {
    //   activiti: activiti
    // },
    height: '100%',
    width: '100%',
    keyboard: {
      bindTo: document.getElementById('bpmnCanvas1')
    }
  })

  // let bpmnFactory = bpmnModeler.value.get('bpmnFactory')
  // bpmnFactory._ensureId = _ensureId

  // var linting = bpmnModeler.get('linting')
  // linting.setLinterConfig(bpmnlintConfig)

  bpmnModeler.value.on('import.parse.complete', event => {
    importParseComplete.value = true
  })

  bpmnModeler.value.on('linting.toggle', event => {
    bpmnlintActive.value = event.active
  })

  // adjustPalette()

  handleModeler()
  createNewDiagram('')
}


onMounted(() => {
  init()
})

function getProcessElement() {
  return bpmnModeler.value.getDefinitions().rootElements.find(item => {
    return item.$type == 'bpmn:Process'
  })
}
function getProcess() {
  const element = getProcessElement()
  return element
}





</script>
  
<style lang="less" scoped>
.fm2-main-content {
  overflow: hidden;
  width: calc(100% - 300px);

  >div {
    padding: 0;
  }
}


.gate-item {
  background: #fff;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
  .exp {
    color: #a94442;
  }
}

</style>

<style lang="less">
.containers {
  background-color: #ffffff;
  width: 100%;
  // height: 100%;
  height: 85vh;

  .canvas {
    width: 100%;
    height: 85vh;
  }

  .panel {
    position: absolute;
    right: 0;
    top: 50px;
    width: 300px;
  }

  .bjs-powered-by {
    display: none;
  }

  .toolbar {
    position: absolute;
    top: 0;
    right: 320px;
    height: 40px;
    width: 600px;
    border: 1px solid red;

    a {
      text-decoration: none;
      margin: 5px;
      color: #409eff;
    }
  }
}

.djs-context-pad {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  width: 120px;
  background: #fff;

  .entry {
    margin-right: 16px;
    margin-bottom: 0;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  .group {
    border-bottom: 1px dashed #707070;
    padding: 5px 10px;

    &:last-child {
      border-bottom: none;
    }

    .entry.bpmn-icon-task,
    // 追加任务
    .entry.bpmn-icon-text-annotation,
    // 文本注释
    .entry.bpmn-icon-intermediate-event-none // 中间/边界事件

      {
      display: none;
    }
  }
}


.bpmn-icon-transaction,
// 运转
.bpmn-icon-event-subprocess-expanded,
// 事件子流程
.bpmn-icon-gateway-complex,
// 复杂网关
.bpmn-icon-gateway-eventbased,
// 事件网关
.bpmn-icon-intermediate-event-none,
// 中间事件
.bpmn-icon-start-event-message,
// 消息开始事件
.bpmn-icon-start-event-timer,
// 定时开始事件
.bpmn-icon-start-event-condition,
// 条件开始事件
.bpmn-icon-start-event-signal,
// 信号开始事件
.bpmn-icon-send,
// 发送任务
.bpmn-icon-receive,
// 接收任务
.bpmn-icon-manual,
// 手工任务
.bpmn-icon-business-rule,
// 业务规则任务
.bpmn-icon-script,
// 脚本任务
.bpmn-icon-task,
// 追加任务
.bpmn-icon-intermediate-event-none,
// 中间事件
.bpmn-icon-end-event-message,
// 消息结束事件
.bpmn-icon-end-event-escalation,
// 定时结束事件
.bpmn-icon-end-event-error,
// 错误结束事件
.bpmn-icon-end-event-compensation,
// 补偿结束事件
.bpmn-icon-end-event-signal,
// 信号结束事件
.bpmn-icon-end-event-terminate,
// 终止结束事件
.bpmn-icon-subprocess-collapsed,
//内部子流程（折叠的）
.bpmn-icon-screw-wrench // 设置

  {
  display: none !important;
}


.djs-popup-header {
  .entry.bpmn-icon-ad-hoc-marker,
  // adHocSubprocess 子流程 5.22版本不支持  activiti6.0以上的版本才支持
  .entry.bpmn-icon-loop-marker // 循环 暂时屏蔽

    {
    display: none;
  }
}


.djs-palette {
  border: none;
  border-right: 1px solid #e6e6e6;
  // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  background: #fff;
  border-radius: 0;
  left: 0;
  top: 0;
  bottom: 0;
  width: 72px !important;
  overflow-y: auto;

  .entry,
  .djs-palette-toggle {
    // padding-left: 10px;
    box-sizing: border-box;
    float: none !important;
    height: auto !important;
    padding: 10px 0 !important;
    line-height: 16px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #333;

    &:hover {
      color: #409eff;
    }
  }

  .entry:before {
    font-size: 20px;
    margin-bottom: 2px;
  }
}

.djs-palette.two-column.open {
  width: 50px;
}
</style>
  