import { BoxDescriptorInput, JsonNode } from "../standard.types"
import { BoxDescriptor } from "../BoxDescriptor"
import { Map as ImmutableMap, fromJS } from 'immutable'

export interface PropConfig {
	name: string,
	props?: any,
	type: string,
	disabled?: boolean,
	default?: any,
	label?: string,
	selections?: any
	path: string,
	row?: number,
	children?: Array<PropConfig>
	rowLabel?: string
}


export interface ComponentMetaConfig {
	name: string,
	group: string,
	image: string,
	title: string,
	box: BoxDescriptorInput,
	// editor: PropsEditorConfigure,
	description: string,
	intrinsic?: boolean,
	style?: any,
	author: string,
	defaultProps: any,
	// 外部组件
	componentType?: 'react' | 'vue',
	src: string,
	file: string,
	url?: string,
	yml: string,
	imageUrl: string,
	version: string
}



export class ComponentMeta {
	name: string
	group: string
	image: string
	title: string
	box: BoxDescriptor
	// editor: PropsEditorConfigure
	intrinsic?: boolean
	url?: string
	style?: any
	defaultProps: any
	imageUrl: string
	// componentType: 'react' | 'vue'
	// props: { [name: string]: PropMeta }
	// groups: Array<GroupMeta>
	// cache: KeyValueCache<any>
	constructor(config: ComponentMetaConfig) {
		this.name = config.name
		this.group = config.group
		this.image = config.image
		this.title = config.title
		this.box = new BoxDescriptor(config.box)
		this.intrinsic = config.intrinsic
		this.url = config.url
		this.style = config.style
		this.defaultProps = config.defaultProps
		this.imageUrl = config.imageUrl
		//     this.componentType = config.componentType || 'react'
		//     this.editor = config.editor
		// this.props = {}
		//     this.groups = []

	}

	createDataFromJson(json: JsonNode): ImmutableMap<string, any> {
		const box = new BoxDescriptor(json.box, this)
		return fromJS({
			...json,
			box
		}) as ImmutableMap<string, any>
	}

	createData(id: number, box: BoxDescriptor | null) {
		let data = ImmutableMap({
			id,
			parent: null,
			name: this.name,
			group: this.group,
			style: ImmutableMap<string, any>(),
			children: [],
			allowDrag: true,
			isMoving: false,
			editMode: false,
			passProps: fromJS(this.defaultProps || {}),
			box
		})

		data = data.update(
			"style",
			(style: any) => {
				const metaStyle = fromJS(this.style) as ImmutableMap<string, any>
				return style.merge(metaStyle)
			}
		)
		return data
	}

}