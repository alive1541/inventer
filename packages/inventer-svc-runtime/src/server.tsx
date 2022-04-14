import express from 'express'
import fs from 'fs'
import path from 'path'


const app = express()

const port = process.env.PORT || 3303

app.use(
	'/static',
	express.static(
		path.resolve(__dirname, '../build')
	)
)


app.get('/', (req, res) => { 
	const ssr = req.query.ssr
	if(ssr) {

	} else {
		const str = fs.readFileSync(path.resolve(__dirname, '../index.html', 'utf-8'))
		res.send(str)
	}

})

app.listen(port , () => {
	console.log(`listen @${port}`);
})