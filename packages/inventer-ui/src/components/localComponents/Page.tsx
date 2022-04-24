import { SkedoComponentProps } from '@inventer/meta'
import useListenChildrenUpdate from '../../hooks/useListenChildrenUpdate'
import ListRender from './ListRender'
export default ({ bridge }: SkedoComponentProps) => {
	useListenChildrenUpdate(bridge.getNode())
	return <ListRender bridge={bridge} />
}