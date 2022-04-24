import { useEffect, useMemo, useState } from "react";
import { DragEvents } from "./draggable.types";
import DragNode from "./DragNode";




export function useDragNode(props: DragEvents): [DragNode, any] {
  const node = useMemo<DragNode>(() => new DragNode(), [])
  const [ver, setVer] = useState(0)

  useEffect(() => {
    console.log('on drag');

    if (node.dragging) {
      console.log('on drag');

      props.onDrag && props.onDrag(node)
    }
  }, [ver])
  const handers = {
    onMouseDown: (e: MouseEvent) => {
      node.start(e)
    },
    onMouseMove: (e: MouseEvent) => {
      if (node.dragging) {
        node.update(e)
        setVer(x => x + 1)
      }
    },
    onMouseUp: (e: DragEvent) => {
      if (node.dragging) {
        node.update(e)
        node.dragging = false
        props.onDragEnd && props.onDragEnd(node)
        node.init()
      }
    }
  }
  return [node, handers]
}