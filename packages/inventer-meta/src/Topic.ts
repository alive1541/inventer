

export enum Topic {
	RemoteComponentLoaded,
	EditMode,
	PropertyModelUpdated,
	// 
	Resized,
	PropertyChanged,
	GeneralMovingEvent,
	NewNodeAdded,
	NodeMoved,
	NodeChildrenChanged,
	SelectionChanged,
	AssistLinedChanged,
	MouseUpEventPass,
	MouseMoveEventPass,
	NodePropUpdated,

	NodeGapIndexChanged,

	ShadowReceiverChanged,
	MemorizedDataChanged,
	ExternalEventNotify,

	Initialize,
	Loaded,
	ContextMessage
}