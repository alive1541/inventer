
import path from 'path'
import fs from 'fs'
// import { CodeProjectFS } from './CodeProjectFS'
import { RollupPackager } from './Rollup'
// import { CodeProjectRepo, ProjectType } from '@skedo/code'
// import { FCBuilder } from './FCBuilder'
export class ProjectBuilder {

	async build(user: string, name: string, cwd: string) {
		// const projectFS = new CodeProjectFS(cwd)
		// const project = await projectFS.download(user, name)

		const rollup = new RollupPackager(cwd)
		console.log("project downloaded...")
		await rollup.build()
		const uploadResult = await fileRemote.post1(
			"codeless",
			"js",
			fs.readFileSync(path.resolve(cwd, 'build/index.js'), 'utf-8')
		)
		project.setScriptURL(uploadResult.data)
		// const repo = new CodeProjectRepo(project)
		// await repo.save()
		break
		const repo = new CodeProjectRepo(project)
		await repo.save()
	}
}