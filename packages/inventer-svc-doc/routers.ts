import express, { Express, Response } from 'express'

import chalk from 'chalk'
import cors from 'cors'
import { DocService } from './service/doc'


export default function routers(app: Express) {
	app.use(cors())
	app.use(express.json())
	function ssi<R>(serviceCall: Function, res: Response): Promise<R>
	function ssi<T, R>(serviceCall: Function, res: Response, arg1: T): Promise<R>
	async function ssi(
		serviceCall: Function,
		res: Response,
		...args: Array<any>
	) {
		try {
			const result = await serviceCall(...args)
			res.send({
				success: true,
				data: result
			})
		} catch (e) {
			console.error(chalk.red(e));
			console.error(chalk.red(e.stack));
			res.status(500).send({
				success: false,
				httpCode: 500,
				message: e.toString()
			})
		}
	}
	app.put('/component/:user/:group/:name', (req, res) => {
		const docSvc = new DocService('component', req.params)
		ssi(docSvc.put.bind(docSvc), res, req.body)
	})
	app.get('/component', (req, res) => {
		const docSvc = new DocService('componet', req.params)
		ssi(docSvc.get.bind(docSvc), res)
	})
	app.delete('/component/:user/:group/:name', (req, res) => {
		const docSvc = new DocService("component", req.params)
		ssi(docSvc.get.bind(docSvc), res)
	});
	app.put('/page/:user/:name', (req, res) => {
		const docSvc = new DocService("page", req.params)
		ssi(docSvc.put.bind(docSvc), res, req.body)
	});

	app.get('/page/:user/:name', (req, res) => {
		const docSvc = new DocService("page", req.params)
		ssi(docSvc.get.bind(docSvc), res)
	});

	app.put('/code-project/:user/:name', (req, res) => {
		const docSvc = new DocService('code-project', req.params)
		ssi(docSvc.put.bind(docSvc), res, req.body)
	})

	app.get('/code-project/:user/:name', (req, res) => {
		const docSvc = new DocService('code-project', req.params)
		ssi(docSvc.get.bind(docSvc), res, req.body)
	})
}