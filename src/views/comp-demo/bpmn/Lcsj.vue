<template>
  <div>
    <div class="fm2-main-content">
      <div>
        <div class="containers">
          <div class="canvas" ref="canvas" id="bpmnCanvas" tabindex="0" />
        </div>
      </div>

    </div>
    <div class="btn-wrapper">
      <a-button type="primary" danger @click="clickClear" style="margin-right: 16px;">清空</a-button>
      <a-button type="primary" @click="clickSave">保存</a-button></div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, shallowRef, reactive, createVNode, unref, onMounted } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useMessage } from '/@/hooks/web/useMessage';
import { Modal, Tabs, Table } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
const { createMessage, createErrorModal } = useMessage();
import BpmnModeler from 'bpmn-js/lib/Modeler'
import lintModule from 'bpmn-js-bpmnlint'
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import customTranslate from './translate/Translate.js'
import customModule from './custom'
import activiti from './bpmn-js-properties-panel/static/flowModel/activiti.json'
import BpmData from './resources/BpmData'
import newXml from './resources/newDiagram.js'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';




// import bpmnlintConfig from './.bpmnlintrc'
const canvas = ref(null)
const bpmnModeler = shallowRef(null)
const bpmData = new BpmData()
const bpmnlintActive = ref(false)
const importParseComplete = ref(true)

const modelData = reactive({
  id: 'xxx',
  key: 'xxx', // 不能用数字开头 否则加载不出来
  name: '流程图测试',
  category: 'xxx',
  description: 'description_1'
})

const process = reactive({
  xml: '',
  svg: ''
})

function _ensureId(element) {
  // generate semantic ids for elements
  // bpmn:SequenceFlow -> SequenceFlow_ID
  var prefix
  if (is(element, 'bpmn:UserTask')) {
    prefix = 'UserTask'
    if (element.loopCharacteristics) {
      prefix = 'SignTask'
    }
  } else if (is(element, 'bpmn:Activity')) {
    prefix = 'Activity'
  } else if (is(element, 'bpmn:StartEvent')) {
    prefix = 'StartEvent'
  } else if (is(element, 'bpmn:EndEvent')) {
    prefix = 'EndEvent'
  } else if (is(element, 'bpmn:Event')) {
    prefix = 'Event'
  } else if (is(element, 'bpmn:Gateway')) {
    prefix = 'Gateway'
  } else if (isAny(element, ['bpmn:SequenceFlow', 'bpmn:MessageFlow'])) {
    prefix = 'Flow'
  } else {
    prefix = (element.$type || '').replace(/^[^:]*:/g, '')
  }

  prefix += '_'
  if (!element.id && _needsId(element)) {
    element.id = bpmnModeler.value._moddle.ids.nextPrefixed(prefix, element)
  }
}

function _needsId(element) {
  return isAny(element, [
    'bpmn:RootElement',
    'bpmn:FlowElement',
    'bpmn:MessageFlow',
    'bpmn:DataAssociation',
    'bpmn:Artifact',
    'bpmn:Participant',
    'bpmn:Lane',
    'bpmn:LaneSet',
    'bpmn:Process',
    'bpmn:Collaboration',
    'bpmndi:BPMNShape',
    'bpmndi:BPMNEdge',
    'bpmndi:BPMNDiagram',
    'bpmndi:BPMNPlane',
    'bpmn:Property',
    'bpmn:CategoryValue'
  ])
}

function adjustPalette() {
  try {
    // 获取 bpmn 设计器实例

    const djsPalette = canvas.value.children[0].children[1].children[5]
    // const djsPalStyle = {
    //   width: "95px",
    //   left: "0px",
    //   background: "white",
    //   borderRadius: 0,
    // };
    // for (var key in djsPalStyle) {
    //   djsPalette.style[key] = djsPalStyle[key];
    // }
    const palette = djsPalette.children[0]
    const allGroups = palette.children
    // 修改控件样式
    for (var gKey in allGroups) {
      const group = allGroups[gKey]
      for (var cKey in group.children) {
        const control = group.children[cKey]
        // const controlStyle = {
        //   display: 'flex',
        //   justifyContent: 'flex-start',
        //   alignItems: 'center',
        //   width: '100%',
        // }
        if (
          control.className &&
          control.dataset &&
          control.className.indexOf('entry') !== -1
        ) {
          const controlProps = bpmData.getControl(
            control.dataset.action
          )
          if (controlProps['title']) {
            control.innerHTML = `<div style='font-size: 12px;font-weight:500;' title='${controlProps['title']}'>${controlProps['title']}</div>`
            // for (var csKey in controlStyle) {
            //   control.style[csKey] = controlStyle[csKey]
            // }
          } else {
            // 隐藏
            control.style.display = 'none'
          }
        }
      }
    }
  } catch (e) { }
}

function createNewDiagram(xml) {
  let originalXML = process.xml
  console.log(modelData)
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
  // console.log(process.xml)
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

function handleModeler() {
  var eventBus = bpmnModeler.value.get('eventBus')
  // shape.added
  eventBus.on('shape.added', (event) => { // 低优先级（数值越大优先级越低）
    console.log('shape.added', event)
    const { element } = event; // 新创建的节点元素
    if(element.type == 'bpmn:EndEvent') {
      element.businessObject.name = '结束'
    }
    
  });
  // eventBus.on('element.dblclick', 1000, (event) => { // 低优先级（数值越大优先级越低）
  //   console.log('测试双击', event)
  //   const element = event.element;
  //   // 获取 selection 模块
  //   if (isForbiddenNode(element)) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // });
 

  // // 定义禁止编辑的节点判断逻辑
  // function isForbiddenNode(element) {
  
  //   // 条件2：按节点类型禁止（如开始事件、结束事件）
  //   const forbiddenTypes = ['bpmn:StartEvent', 'bpmn:EndEvent']; 
  //   return (
  //     forbiddenTypes.includes(element.type)
  //   );
  // }
}

async function init() {
  // 生成实例
  bpmnModeler.value = new BpmnModeler({
    container: canvas.value,
    linting: {
      // bpmnlint: bpmnlintConfig,
      active: bpmnlintActive.value
    },
    additionalModules: [
      customModule,
      lintModule,
      //  propertiesPanelModule,
      //propertiesProviderModule,
      {
        translate: ['value', customTranslate]
      },
    ],
    moddleExtensions: {
      activiti: activiti
    },
    height: '100%',
    width: '100%',
    keyboard: {
      bindTo: document.getElementById('bpmnCanvas')
    }
  })

  let bpmnFactory = bpmnModeler.value.get('bpmnFactory')
  bpmnFactory._ensureId = _ensureId

  // var linting = bpmnModeler.get('linting')
  // linting.setLinterConfig(bpmnlintConfig)

  bpmnModeler.value.on('import.parse.complete', event => {
    importParseComplete.value = true
  })

  bpmnModeler.value.on('linting.toggle', event => {
    bpmnlintActive.value = event.active
  })

  adjustPalette()

  handleModeler()

 
  // 调用接口
  let res

  if(res && res.hbnr) {
    createNewDiagram(res.hbnr)
  } else {
    console.log('执行了')
    createNewDiagram('')
  }
 
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

// 保存的接口
// function getErrorMsg(issues) {
//   let errors = []
//   Object.keys(issues).forEach(item => {
//     issues[item].forEach(error => {
//       if (error.category == 'error') {
//         let msg = error.id + ' ' + error.message + '<br/>'
//         errors.push(msg)
//       }
//     })
//   })
//   return errors
// }

function handleSave() {
  bpmnlintActive.value = true
  // var linting = bpmnModeler.value.get('linting')
  // console.log(linting)
  // if (Object.keys(linting._issues).length > 0) {
  //   let errorMsg = getErrorMsg(linting._issues)
  //   if (errorMsg.length > 0) {
  //     // this.$message.error({
  //     //   dangerouslyUseHTMLString: true,
  //     //   message: errorMsg
  //     // })
  //     return
  //   }
  // }


  bpmnModeler.value
    .saveXML({
      format: true
    })
    .then(async ({ xml }) => {
      console.log(xml, 'xml')
      const process = getProcess()
      console.log(process, 'process')
      // if (!modelData.typeName) {
      //   // this.$message.error({
      //   //   message: '请选择分类'
      //   // })
      //   // this.activeName = 'gloablePropertyPanel'
      //   console.log('请选择分类')
      //   return
      // }
      // if (!process.id) {
      //   // this.$message.error({
      //   //   message: '请输入流程key'
      //   // })
      //   console.log('请输入流程key')
      //   // this.activeName = 'gloablePropertyPanel'
      //   return
      // } else if (!/^[^0-9][\w]{1,30}$/.test(process.id)) {
      //   // this.$message.error({
      //   //   message:
      //   //     '流程key只能由字母开头的不超过30位的字母、数字、下划线组成'
      //   // })
      //   console.log('流程key只能由字母开头的不超过30位的字母、数字、下划线组成')
      //   // this.activeName = 'gloablePropertyPanel'
      //   return
      // }
      // if (!process.name) {
      //   // this.$message.error({
      //   //   message: '请输入流程名称'
      //   // })
      //   console.log('请输入流程名称')
      //   // this.activeName = 'gloablePropertyPanel'
      //   return
      // }
      if (!process.flowElements || !process.flowElements.length) {
        // this.$message.error({
        //   message: '请添加节点'
        // })
        // console.log('请添加节点')
        createMessage.error('请添加节点')
        // this.activeName = 'gloablePropertyPanel'
        return
      }

      process.xml = xml
      modelData.bpmnXml = xml
      modelData.key = process.id
      modelData.defKey = process.id
      modelData.name = process.name
      modelData.category = process.category

      console.log(modelData, 'modelData')
      
      createMessage.success('保存成功')
    })
}

function clickSave() {
  handleSave()
}

function clickClear() {

  Modal.confirm({
    content: '您确定要清除流程吗？',
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      createNewDiagram('')
      createMessage.success('清除成功，还原至默认流程结构')
    },
    onCancel() { },
  });
}



</script>
  
<style lang="less" scoped>
.fm2-main-content {
  overflow: hidden;

  >div {
    padding: 0;
  }
}

.btn-wrapper {
  position: absolute;
  top: 16px;
  right: 16px;
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
  