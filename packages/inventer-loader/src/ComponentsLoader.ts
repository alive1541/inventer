import { Emiter } from '@inventer/utils'
import { ComponentMeta, Topic, ComponentMetaConfig, metaSchema } from '@inventer/meta'
import * as R from 'ramda'
import { Validator } from 'jsonschema'

function loadDefault() {
  const def: ComponentMetaConfig = require('../yml/default.yml')
  return def
}

const metas: { [key: string]: ComponentMeta } = {}
const ymls: { [key: string]: ComponentMetaConfig } = {}

// @ts-ignore
require.context('../yml', true, /\.yml$/)
  .keys()
  .forEach((key: string) => {
    key = key.replace('./', '')
    const [a,] = key.split('.')
    const n = a.split('/').pop()
    if (n && n !== 'default') {
      const config: ComponentMetaConfig = require(`../yml/${key}`)
      ymls[config.group + '.' + config.name] = config
    }
  })
export class ComponentsLoader extends Emiter<Topic> {
  private static inst: ComponentsLoader = new ComponentsLoader()

  static defaultProps: ComponentMetaConfig = loadDefault()
  state: number = 0
  list: Array<ComponentMeta> = []

  loadByName(group: string, name: string): ComponentMeta {
    const key = group + '.' + name
    if (!metas[key]) {
      const props = R.clone(
        ComponentsLoader.defaultProps
      )
      if (!ymls[key]) {
        throw new Error(key + 'not fount')
      }
      const customProps = ymls[key]
      const merged = mergeLeft(props, customProps)
      validateConfig(key, merged)
      const meta = new ComponentMeta(merged)
      metas[key] = meta
    }
    return metas[key]
  }
  static get() {
    // @ts-ignore
    window.componentsLoader = ComponentsLoader.inst
    return ComponentsLoader.inst
  }
  async load() {
    if (this.state === 1) {
      this.emit(Topic.RemoteComponentsLoaded)
      return
    }
    for (let key in ymls) {
      const [group, name] = key.split('.')
      this.loadByName(group, name)
    }
    this.list = Object.values(metas).filter(meta => meta.intrinsic !== true)
    this.emit(Topic.RemoteComponentsLoaded)
  }
}



function mergeLeft(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const list = [...a]

    for (let i = 0; i < b.length; i++) {

      let match = false
      for (let j = 0; j < a.length; j++) {
        if (b[i].name === a[j].name) {
          match = true
          a[j] = mergeLeft(a[j], b[i])
          // list.push(mergeLeft(a[i], b[j]))
          break
        }
      }

      if (!match) {
        list.push(b[i])
      }
    }
    return list
  }
  else if (typeof (a) === 'object' && typeof (b) === 'object') {
    for (let key in b) {
      const val = b[key]
      if (!a[key]) {
        a[key] = b[key]
        continue
      }

      if (typeof (val) === 'object' || Array.isArray(val)) {
        a[key] = mergeLeft(a[key], val)
      }
      else {
        a[key] = b[key]
      }
    }
  }
  return a
}

function validateConfig(file: string, config: ComponentMetaConfig) {
  const v = new Validator()
  const result = v.validate(config, metaSchema)

  if (result.errors.length > 0) {
    const error = result.errors[0]
    throw new Error(`validate error in ${file}:` + error.stack)
  }

}