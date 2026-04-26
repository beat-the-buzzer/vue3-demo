export default function (processId, processName, category, description) {
    var startEventListener = "${startEventListener}";
    var endEventListener = "${endEventListener}";
    var taskCreateListener = "${taskCreateListener}";
    var taskCompleteListener = "${taskCompleteListener}";
    return `<bpmn:definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ext="http://www.zfsoft.com/bpm" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:ht="http://www.zfsoft.com/BPMN20EXT" targetNamespace="http://activiti.org/bpmn20">
  <process id="${processId}" name="${processName}" isExecutable="true">
    <documentation>a</documentation>
    <extensionElements>
      <activiti:executionListener delegateExpression="${startEventListener}" event="start" />
      <activiti:executionListener delegateExpression="${endEventListener}" event="end" />
    </extensionElements>
    <startEvent id="StartEvent_07e5zvf" name="开始">
      <outgoing>Flow_0sk538o</outgoing>
    </startEvent>
    <userTask id="UserTask_043do24" name="用户任务">
      <extensionElements>
        <activiti:taskListener delegateExpression="${taskCreateListener}" event="create" />
        <activiti:taskListener delegateExpression="${taskCompleteListener}" event="complete" />
      </extensionElements>
      <incoming>Flow_0sk538o</incoming>
    </userTask>
    <sequenceFlow id="Flow_0sk538o" sourceRef="StartEvent_07e5zvf" targetRef="UserTask_043do24" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_">
    <bpmndi:BPMNPlane id="BPMNPlane_" bpmnElement="${processId}">
      <bpmndi:BPMNEdge id="Flow_0sk538o_di" bpmnElement="Flow_0sk538o">
        <omgdi:waypoint x="125" y="83" />
        <omgdi:waypoint x="180" y="83" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_07e5zvf_di" bpmnElement="StartEvent_07e5zvf">
        <omgdc:Bounds x="95" y="68" width="30" height="30" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="99" y="101" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_043do24_di" bpmnElement="UserTask_043do24">
        <omgdc:Bounds x="180" y="60" width="100" height="46" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
}