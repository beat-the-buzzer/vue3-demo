import {
  changeElementSize,
} from "./util";
export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate, modeling, bpmnFactory) {
    this.creates = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.modeling = modeling;
    this.bpmnFactory = bpmnFactory;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this); // // 定义这是一个contextPad
  }

  getContextPadEntries(element) {
    // 自定义右键菜单 如果点击的是线 不出现自定义菜单
    if (element.type == 'bpmn:SequenceFlow') {
      return {};
    }
    const {
      autoPlace,
      create,
      elementFactory,
      translate,
      modeling,
      bpmnFactory
    } = this;
    // 删除功能
    function removeElement(e) {
      modeling.removeElements([element])
    }

    function clickElement(e) {
    }

    function appendTask(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
        changeElementSize(shape);
        autoPlace.append(element, shape);
      } else {
        appendTaskStart(event, element);
      }
    }

    function appendTaskStart(event, element) {
      const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
      changeElementSize(shape);
      create.start(event, shape, element);
    }

    function editElement() { // 创建编辑图标
      return {
        group: 'edit',
        className: 'icon-custom icon-custom-edit',
        title: translate('编辑'),
        action: {
          click: clickElement
        }
      }
    }

    function deleteElement() {
      return {
        group: 'edit',
        className: 'icon-custom icon-custom-delete',
        title: translate('删除'),
        action: {
          click: removeElement
        }
      }
    }

    function appendAndClickAnnotation(color) {
      return function (event, element) {
        const businessObject = bpmnFactory.create('bpmn:TextAnnotation');
        if (color) {
          businessObject.color = color
        }
        const shape = elementFactory.createShape({ type: 'bpmn:TextAnnotation', businessObject });
        autoPlace.append(element, shape);
      }
    }

    function createSignTask(append, isSequential) {
      return function (event, element) {
        let loopCharacteristics = bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics');

        const businessObject = bpmnFactory.create('bpmn:UserTask', { loopCharacteristics: loopCharacteristics });
        businessObject['custom'] = 1
        businessObject.name = "会签并行任务";
        if (isSequential) {
          loopCharacteristics.isSequential = true;
          businessObject.name = "会签串行任务";
        }
        const shape = elementFactory.createShape({
          type: 'bpmn:UserTask',
          businessObject
        });
        changeElementSize(shape);
        if (append) {
          autoPlace.append(element, shape);
        } else {
          create.start(event, shape);
        }
      }
    }
    function createSubprocessCollapsed(append) {
      return function (event, element) {
        const businessObject = bpmnFactory.create('bpmn:CallActivity');
        businessObject['custom'] = 1
        businessObject.name = "外部子流程";
        const shape = elementFactory.createShape({
          type: 'bpmn:CallActivity',
          businessObject
        });
        changeElementSize(shape);
        if (append) {
          autoPlace.append(element, shape);
        } else {
          create.start(event, shape);
        }
      }
    }

    return {
      'append.user-task': {
        group: 'model',
        className: 'bpmn-icon-user-task',
        title: translate('用户任务'),
        action: {
          click: appendTask,
          dragstart: appendTaskStart
        }
      },
      // 'append.sign-task': {
      //   group: 'model',
      //   className: 'bpmn-icon-parallel-mi-marker',
      //   title: translate('会签并行任务'),
      //   action: {
      //     click: createSignTask(true, false),
      //     dragstart: createSignTask(false, false)
      //   }
      // },
      // 'append.sign-task-sequential': {
      //   group: 'model',
      //   className: 'bpmn-icon-sequential-mi-marker',
      //   title: translate('会签串行任务'),
      //   action: {
      //     click: createSignTask(true, true),
      //     dragstart: createSignTask(false, true)
      //   }
      // },
      // 'create.subprocess-collapsed': {
      //   group: 'model',
      //   className: 'bpmn-icon-subprocess-collapsed',
      //   title: translate('外部子流程'),
      //   action: {
      //     click: createSubprocessCollapsed(true),
      //     dragstart: createSubprocessCollapsed(false)
      //   }
      // }

    }
  }
}

CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
  'modeling',
  'bpmnFactory'
];