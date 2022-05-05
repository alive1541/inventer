import React, { useEffect } from 'react'
import ComponentList from '../components/ComponentList'
import Pannel from '../components/render/Pannel'
import { useParams } from 'react-router-dom'
import useEditer from '../hooks/useEditer'
import style from "./ui.module.scss"
import NodeRender from '../components/render/NodeRender'
import { UIModel } from '../object/UIModel'
import PropEditor from '../components/propeditor/ComponentPropEditor'
import { Tabs } from 'antd'
import { TitleBar } from '../components/frame/TitleBar'
const { TabPane } = Tabs


const Inventor = () => {
	let { page: pageName } = useParams<{ [key: string]: string }>()
	if (!pageName) {
		pageName = 'default'
	}
	const [editor] = useEditer(pageName)
	useEffect(() => {
		if (!editor) {
			return
		}
		setInterval(() => {
			editor.save()
		}, 5000)
	}, [editor])
	if (!editor) {
		return null
	}

	return <React.Fragment>
		<TitleBar pageName={pageName} name="inventer" />
		<div className={style.container}>
			<ComponentList editor={editor}></ComponentList>
			<Pannel editor={editor}>
				<NodeRender node={editor.page.root}></NodeRender>
			</Pannel>
			<div className={style["right"]}>
				<RightTabs editor={editor} />
			</div>
		</div>

	</React.Fragment>
}

interface RightTabsProps {
	editor: UIModel
}
const RightTabs = ({ editor }: RightTabsProps) => {
	return <Tabs defaultActiveKey="1" type="card" style={{
		height: '100%'
	}}>
		<TabPane tab="属性编辑" key="1">
			<PropEditor editor={editor} />
		</TabPane>
		{/* <TabPane tab="页面结构" key="2">
			<PageStructure editor={editor} />
		</TabPane> */}
	</Tabs>
}



export default Inventor