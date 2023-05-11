import { generateBaseActions } from './actions/base'

export class CredentialService {
  public base = {
    actions: generateBaseActions(),
  }
}
