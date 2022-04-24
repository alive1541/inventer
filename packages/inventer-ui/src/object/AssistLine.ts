import { Node, Topic } from '@inventer/meta'
import { Emiter, Logger, Rect } from '@inventer/utils'


export interface LineDescriptor {
	dir: 0 | 1 // 0 - 水平 1 - 垂直
	type: 0 | 1 // 0-居中对齐线  1: 两侧对齐线
	pos: number,
	distance: number
}



export class AssistLine extends Emiter<Topic> {

}