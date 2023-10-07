import { isNil } from 'lodash'
import { PluginType } from '@/services/plugin'
import { ActionResult } from '@/@types/action'

export const checkConfig = (config: any): ActionResult<boolean> => {
  for (const key of ['identifier', 'version', 'title', 'description']) {
    if (isNil(config[key])) {
      return { data: false, msg: `config.json the key ${key} is lost` }
    }
  }

  if (!Object.values(PluginType).includes(config.type)) {
    return {
      data: false,
      msg: `config.json type: ${
        config.type
      } can not be disposed, it should in ${Object.values(
        PluginType
      ).toString()}`,
    }
  }

  if (!Array.isArray(config.tags)) {
    return { data: false, msg: 'config.json tags should be type Array' }
  }

  return { data: true }
}
