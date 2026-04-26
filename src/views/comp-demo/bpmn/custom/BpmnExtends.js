// BpmnFactory.prototype._ensureId = function (element) {
//     // generate semantic ids for elements
//     // bpmn:SequenceFlow -> SequenceFlow_ID
//     var prefix;

//     if (is(element, 'bpmn:Activity')) {
//         prefix = 'Activity';
//     } else if (is(element, 'bpmn:Event')) {
//         prefix = 'Event';
//     } else if (is(element, 'bpmn:Gateway')) {
//         prefix = 'Gateway';
//     } else if (isAny(element, ['bpmn:SequenceFlow', 'bpmn:MessageFlow'])) {
//         prefix = 'Flow';
//     } else {
//         prefix = (element.$type || '').replace(/^[^:]*:/g, '');
//     }

//     prefix += '_';

//     if (!element.id && this._needsId(element)) {
//         element.id = this._model.ids.nextPrefixed(prefix, element);
//     }
// };