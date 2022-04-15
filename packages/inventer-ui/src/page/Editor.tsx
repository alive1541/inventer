import React from 'react'
import ComponentList from '../components/ComponentList'
import Pannel from '../components/render/Pannel'
import NodeRender from '../components/render/NodeRender'
import { useParams } from 'react-router-dom'
import useEditer from '../hooks/useEditer'


const Inventor = () => {
	let {page: pageName} = useParams<{[key: string]: string}>()
	if(!pageName) {
		pageName = 'default'
	}
	const [editor] = useEditer(pageName)


return <React.Fragment>
	<ComponentList editor={editor}></ComponentList>	
	<Pannel editor={editor}>
		<NodeRender></NodeRender>
	</Pannel>
</React.Fragment>
}


export default Inventor