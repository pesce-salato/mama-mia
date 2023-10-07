import { generateBaseActions } from './actions/base'

export class IoService {
  public base = {
    actions: generateBaseActions(),
  }
}
