import {useRef} from 'react'
// import {UIModel} from '../object/UIModel'
import { ComponentMeta } from "@inventer/meta"
import { ComponentsLoader }  from '@inventer/loader'
import style from './compo-list.module.scss'
import { groupBy } from 'ramda'

interface ComponentListProps {
	// editor: UIModel
	editor: any 
}


const ComponentList = ({ editor }: ComponentListProps) => {
	const loader = useRef(ComponentsLoader.get())
	const groupList = Object.values(groupBy((x:any) => x.group, loader.current.list))
	return <div className={style["component-list"]}>
		<div className={style["component-list-inner"]}>
			{
				groupList.map((list:Array<ComponentMeta>, i) => {
					const title = list[0].group
					return <div key={i} className={style['component-list-group']}>
						<h2>{title}</h2>
					</div>
				})
			}
		</div>
	</div>
}

export default ComponentList