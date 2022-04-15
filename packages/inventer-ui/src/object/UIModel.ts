import StateMachine from "./StateMachine";
import { JsonPage, Topic } from '@inventer/meta'
export enum UIStates {
	Start,
	StartAdd,
	Adding,
	Added,
	Selected,
	Moving,
	Moved,
	StartResize,
	Resizing,
	Resized
}

export enum UIEvents {
	AUTO,
	EvtStartDragAdd,
	EvtAddDraging,
	EvtDrop,
	EvtMoving,
	EvtSelected,
	EvtCancelSelect,
	EvtNodeMoved,
	EvtNodeSyncMoving,
	EvtStartResize
}

export class UIModel extends StateMachine<UIStates, UIEvents, Topic> {

	constructor(json: JsonPage, pageName: string) {
		super(UIStates.Start)

		// @ts-ignore
		window.editor = this
	}

}