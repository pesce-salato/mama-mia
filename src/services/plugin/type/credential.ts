import { type Page } from 'puppeteer-core'

export interface CredentialPluginGetValue {
  /**
   * title of this credential
   */
  title?: string
  /**
   * the domain of the credential will apply to
   */
  domain: string
  /**
   * the data of the credential, any type supported by JSON.stringify.
   */
  data: any
}

export interface CredentialPlugin {
  /**
   * use plugin to get credential
   * @param page current page
   * @return the return value should be the credential detail
   */
  get: (page: Page) => Promise<CredentialPluginGetValue>
  /**
   * use plugin to apply credential data to current page
   * @param page current page
   * @param data credential data
   * @return is action succeed
   */
  apply: (page: Page, data: any) => Promise<boolean>
  /**
   * use plugin to clear credential
   * @param page
   */
  clear: (page: Page) => Promise<boolean>
}
