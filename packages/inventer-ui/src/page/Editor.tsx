import React from 'react'
import ComponentList from '../components/ComponentList'
import Pannel from '../components/render/Pannel'
import NodeRender from '../components/render/NodeRender'


const Inventor = () => {
return <React.Fragment>
	<ComponentList editor={null}></ComponentList>	
	<Pannel editor={null}>
		<NodeRender></NodeRender>
	</Pannel>
</React.Fragment>
}


export default Inventor