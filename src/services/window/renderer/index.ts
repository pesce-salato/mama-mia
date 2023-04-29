import { generateMainActions } from './actions/main'

export class WindowService {
  constructor() {
    // default
  }

  public main = {
    actions: generateMainActions(),
  }
}
