
const myCustomElements = ['bpmn:Task', 'bpmn:UserTask', 'bpmn:ServiceTask', 'bpmn:SendTask', 'bpmn:BusinessRuleTask', 'bpmn:ScriptTask',
  'bpmn:ReceiveTask', 'bpmn:ManualTask', 'bpmn:StartEvent', 'bpmn:EndEvent', 'bpmn:CallActivity', 'bpmn:SubProcess',
  "bpmn:ExclusiveGateway",
  "bpmn:ParallelGateway",
  "bpmn:InclusiveGateway",
  "bpmn:EventBasedGateway",
  "bpmn:Lane",
  "bpmn:Participant"] // 自定义元素的类型

const customConfig = { // 自定义元素的配置
  'bpmn:Task': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "任务"
  },
  'bpmn:UserTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "用户任务"
  },
  'bpmn:ServiceTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "服务任务"
  },
  'bpmn:SendTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "发送任务"
  },
  'bpmn:BusinessRuleTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "业务规则任务"
  },
  'bpmn:ScriptTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "脚本任务"
  },
  'bpmn:ReceiveTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "接收任务"
  },
  'bpmn:ManualTask': {
    'attr': { x: 0, y: 0, width: 100, height: 46 },
    'name': "人工任务"
  },
  "bpmn:EndEvent": {
    'attr': { x: 0, y: 0, width: 30, height: 30 },
    'name': "结束"
  },
  "bpmn:StartEvent": {
    'attr': { x: 0, y: 0, width: 30, height: 30 },
    'name': "开始"
  },
  "bpmn:CallActivity": {
    'name': "外部子流程"
  },
  "bpmn:SubProcess": {
    'attr': { x: 0, y: 0, width: 350, height: 200 },
    'name': "内部子流程"
  },
  "bpmn:ExclusiveGateway": {
    'name': "网关"
  },
  "bpmn:ParallelGateway": {
    'name': "网关"
  },
  "bpmn:InclusiveGateway": {
    'name': "网关"
  },
  "bpmn:EventBasedGateway": {
    'name': "网关"
  },
  "bpmn:Lane": {
    'name': "泳道"
  },
  "bpmn:Participant": {
    'name': "泳池"
  }
}
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 一开始就有label标签的元素类型

function changeElementSize(element) {
  let type = element.type;
  if (myCustomElements.includes(type)) {
    const { attr, name } = customConfig[type];
    if (attr) {
      element["width"] = attr.width; // 这里我是取了巧, 直接修改了元素的宽高
      element["height"] = attr.height;
    }
    if (name && !element.businessObject.name) {
      element.businessObject.name = name;
    }
  }
}

export { myCustomElements, customConfig, hasLabelElements, changeElementSize }