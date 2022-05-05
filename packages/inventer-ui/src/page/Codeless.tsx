import { TitleBar } from '../components/frame/TitleBar'
import { useParams } from 'react-router-dom'
import Editor from '../components/codeless/index'



const Codeless = () => {
	let { page: pageName } = useParams<{ [key: string]: string }>()
	if (!pageName) {
		pageName = 'default'
	}
	return <>
		<TitleBar pageName={pageName} name="codeless"></TitleBar>
		<Editor />
	</>
}


export default Codeless