import { Node, Topic } from '@inventer/meta'
import { useEffect, useState } from 'react'


export default function useListenChildrenUpdate(node: Node) {
	const [, setVer] = useState(0)
	useEffect(() => {
		const sub = node.on([Topic.NewNodeAdded, Topic.NodeChildrenChanged])
			.subscribe(() => {
				setVer(x => x + 1)
			})

		return () => {
			sub.unsubscribe()
		}
	}, [])
}