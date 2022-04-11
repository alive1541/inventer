import express, { Express, Response } from 'express'

import chalk from 'chalk'
import cors from 'cors'


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
}