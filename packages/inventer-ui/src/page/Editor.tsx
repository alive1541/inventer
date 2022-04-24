import React from 'react'
import ComponentList from '../components/ComponentList'
import Pannel from '../components/render/Pannel'
import { useParams } from 'react-router-dom'
import useEditer from '../hooks/useEditer'
import style from "./ui.module.scss"
import NodeRender from '../components/render/NodeRender'


const Inventor = () => {
	let { page: pageName } = useParams<{ [key: string]: string }>()
	if (!pageName) {
		pageName = 'default'
	}
	const [editor] = useEditer(pageName)

	if (!editor) {
		return null
	}

	return <React.Fragment>
		<div className={style.container}>
			<ComponentList editor={editor}></ComponentList>
			<Pannel editor={editor}>
				<NodeRender node={editor.page.root}></NodeRender>
			</Pannel>
		</div>

	</React.Fragment>
}


export default Inventor