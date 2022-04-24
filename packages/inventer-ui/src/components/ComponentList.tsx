import { useRef } from 'react'
import { ComponentMeta } from "@inventer/meta"
import { ComponentsLoader } from '@inventer/loader'
import style from './compo-list.module.scss'
import { groupBy } from 'ramda'
import { UIEvents, UIModel } from '../object/UIModel'

interface ComponentListProps {
	// editor: UIModel
	editor: UIModel
}


const ComponentList = ({ editor }: ComponentListProps) => {
	console.log('components', ComponentsLoader.get());
	console.log('editor', editor);

	const loader = useRef(ComponentsLoader.get())
	const groupList = Object.values(groupBy((x: any) => x.group, loader.current.list))
	return <div className={style["component-list"]}>
		<div className={style["component-list-inner"]}>
			{
				groupList.map((list: Array<ComponentMeta>, i) => {
					const title = list[0].group
					return <div key={i} className={style['component-list-group']}>
						<h2>{title}</h2>
						{list.map((compConf) => {
							return (
								<div
									key={compConf.name}
									draggable
									onDragStart={(event) => {
										event.preventDefault()
										editor.dispatch(UIEvents.EvtStartDragAdd, compConf)
									}}
									className={style["component-list-item"]}
								>
									<img src={compConf.imageUrl} alt="" />
									<div className={style.text}>
										{compConf.title}
									</div>
								</div>
							)
						})}
						<div style={{ clear: "both" }}></div>
					</div>
				})
			}
		</div>
	</div>
}

export default ComponentList