import { Redis } from './Redis'

const isDev = process.env.NODE_ENV === 'development'

export class ProjectVer {
	vers: Record<string, number> = {}
	private static inst: ProjectVer = new ProjectVer()

	public static getInst() {
		return ProjectVer.inst
	}

	private constructor() { }

	public async getVer(projetName: string) {
		if (isDev) {
			return this.vers[projetName] || 0
		} else {
			const client = await Redis.getInst().getClient()
			return await client.get('ver-' + projetName)
		}
	}
	public async incVer(projetName: string) {
		if (isDev) {
			this.vers[projetName] = (this.vers[projetName] || 0) + 1
		} else {
			const client = await Redis.getInst().getClient()
			await client.incr('ver-' + projetName)
		}
	}

	public async setVer(projectName: string, ver: number) {
		if (isDev) {
			this.vers[projectName] = ver
		} else {
			const client = await Redis.getInst().getClient()
			await client.set('ver-' + projectName, ver + '')
		}
	}
}