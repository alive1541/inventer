import {BrowserRouter, Route} from 'react-router-dom'
import Editor from './page/Editor'

function genTempUser() {
	if(!localStorage['x-user']) {
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
	</BrowserRouter>
}

export default App