import { useEffect, useState } from "react";
import { JsonPage, Topic } from '@inventer/meta'
import { ComponentsLoader } from '@inventer/loader'
import { UIModel } from '../object/UIModel'

const json: JsonPage = {
	page: {
		type: "react",
		name: "page",
		group: "container",
		box: {
			left: (3200 - 414) / 2,
			top: 40,
			width: 414,
			height: 736,
		},
		children: [],
		style: {
			border: "1px solid #eee",
			backgroundColor: "white",
		},
	},
	links: {}
}

const useEditer = (pageName: string) => {
	const [editor, setEditor] = useState<UIModel | null>(null)
	useEffect(() => {
		ComponentsLoader.get().load()

		setEditor(new UIModel(json, pageName))
	}, [])
	return [editor]
}

export default useEditer