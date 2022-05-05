import { BrowserRouter, Route } from 'react-router-dom'
import Editor from './page/Editor'
import Codeless from './page/Codeless'

function genTempUser() {
	if (!localStorage['x-user']) {
		localStorage['x-user'] = [...Array(8)].map(
			x => String.fromCharCode(Math.floor(97 + Math.random() * 26))
		).join('')
	}
}

genTempUser()

const App = () => {
	return <BrowserRouter>
		<Route path="/inventer/:page">
			<Editor></Editor>
		</Route>
		<Route path="/codeless/:page">
			<Codeless></Codeless>
		</Route>
	</BrowserRouter>
}

export default App