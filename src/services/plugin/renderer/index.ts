import { generateBaseActions } from './actions/base'

export class PluginService {
  public base = {
    actions: generateBaseActions(),
  }
}
