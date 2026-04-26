import {
  changeElementSize,
} from "./util";
export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function createTask() {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:UserTask');
        businessObject['custom'] = 1
        businessObject.name = "用户任务";
        const shape = elementFactory.createShape({
          type: 'bpmn:UserTask',
          businessObject
        });
        changeElementSize(shape);
        create.start(event, shape);
      }
    }

    function createSignTask(isSequential) {
      return function (event) {
        let loopCharacteristics = bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics');
        if (isSequential) {
          loopCharacteristics.isSequential = true;
        }
        const businessObject = bpmnFactory.create('bpmn:UserTask', { loopCharacteristics: loopCharacteristics });
        businessObject['custom'] = 1
        businessObject.name = "会签任务";

        const shape = elementFactory.createShape({
          type: 'bpmn:UserTask',
          businessObject
        });
        changeElementSize(shape);
        create.start(event, shape);
      }
    }

    function createServiceTask() {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:ServiceTask');
        businessObject['custom'] = 1
        businessObject.name = "服务任务";
        const shape = elementFactory.createShape({
          type: 'bpmn:ServiceTask',
          businessObject
        });
        changeElementSize(shape);
        create.start(event, shape);
      }
    }

    function createStartEvent() {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:StartEvent');
        businessObject['custom'] = 1
        businessObject.name = "开始";
        const shape = elementFactory.createShape({
          type: 'bpmn:StartEvent',
          businessObject
        });
        changeElementSize(shape);
        create.start(event, shape);
      }
    }

    function createEndEvent() {
      // 左边拖过来会执行
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:EndEvent');
        businessObject['custom'] = 1
        businessObject.name = "结束";
        const shape = elementFactory.createShape({
          type: 'bpmn:EndEvent',
          businessObject
        });
        changeElementSize(shape);
        create.start(event, shape);
      }
    }

    function createSubprocessCollapsed() {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:CallActivity');
        businessObject['custom'] = 1
        businessObject.name = "外部子流程";
        const shape = elementFactory.createShape({
          type: 'bpmn:CallActivity',
          businessObject
        });
        changeElementSize(shape);
        create.start(event, shape);
      }
    }


    return {
      'create.start-event': {
        group: 'model',
        className: 'bpmn-icon-start-event-none',
        title: translate('开始'),
        action: {
          dragstart: createStartEvent(),
          click: createStartEvent()
        }
      },
      'create.end-event': {
        group: 'model',
        className: 'bpmn-icon-end-event-none',
        title: translate('结束'),
        action: {
          dragstart: createEndEvent(),
          click: createEndEvent()
        }
      },
      'create.user-task': {
        group: 'model',
        // className: 'icon-custom lindaidai-task',
        className: 'bpmn-icon-user-task',
        title: translate('用户任务'),
        action: {
          dragstart: createTask(),
          click: createTask()
        }
      },
      'create.sign-task': {
        group: 'model',
        // className: 'icon-custom lindaidai-task', bpmn-icon-business-rule
        className: 'bpmn-icon-parallel-mi-marker',
        title: translate('会签并行'),
        action: {
          dragstart: createSignTask(),
          click: createSignTask()
        }
      },
      'create.sign-task-sequential': {
        group: 'model',
        // className: 'icon-custom lindaidai-task',
        className: 'bpmn-icon-sequential-mi-marker',
        title: translate('会签串行'),
        action: {
          dragstart: createSignTask(true),
          click: createSignTask(true)
        }
      },
      'create.service-task': {
        group: 'model',
        // className: 'icon-custom lindaidai-task',
        className: 'bpmn-icon-service-task',
        title: translate('服务任务'),
        action: {
          dragstart: createServiceTask(),
          click: createServiceTask()
        }
      },
      'create.subprocess-collapsed': {
        group: 'model',
        className: 'bpmn-icon-subprocess-collapsed',
        title: translate('外部子流程'),
        action: {
          dragstart: createSubprocessCollapsed(),
          click: createSubprocessCollapsed()
        }
      }
    }
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
]