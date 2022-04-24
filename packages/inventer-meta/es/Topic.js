"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
var Topic;
(function (Topic) {
    Topic[Topic["RemoteComponentsLoaded"] = 0] = "RemoteComponentsLoaded";
    Topic[Topic["EditMode"] = 1] = "EditMode";
    Topic[Topic["PropertyModelUpdated"] = 2] = "PropertyModelUpdated";
    // 
    Topic[Topic["Resized"] = 3] = "Resized";
    Topic[Topic["PropertyChanged"] = 4] = "PropertyChanged";
    Topic[Topic["GeneralMovingEvent"] = 5] = "GeneralMovingEvent";
    Topic[Topic["NewNodeAdded"] = 6] = "NewNodeAdded";
    Topic[Topic["NodeMoved"] = 7] = "NodeMoved";
    Topic[Topic["NodeChildrenChanged"] = 8] = "NodeChildrenChanged";
    Topic[Topic["SelectionChanged"] = 9] = "SelectionChanged";
    Topic[Topic["AssistLinedChanged"] = 10] = "AssistLinedChanged";
    Topic[Topic["MouseUpEventPass"] = 11] = "MouseUpEventPass";
    Topic[Topic["MouseMoveEventPass"] = 12] = "MouseMoveEventPass";
    Topic[Topic["NodePropUpdated"] = 13] = "NodePropUpdated";
    Topic[Topic["NodeGapIndexChanged"] = 14] = "NodeGapIndexChanged";
    Topic[Topic["ShadowReceiverChanged"] = 15] = "ShadowReceiverChanged";
    Topic[Topic["MemorizedDataChanged"] = 16] = "MemorizedDataChanged";
    Topic[Topic["ExternalEventNotify"] = 17] = "ExternalEventNotify";
    Topic[Topic["Initialize"] = 18] = "Initialize";
    Topic[Topic["Loaded"] = 19] = "Loaded";
    Topic[Topic["ContextMessage"] = 20] = "ContextMessage";
})(Topic = exports.Topic || (exports.Topic = {}));
