import { CredentialPlugin } from '@/services/plugin'
import { MainProcessContext } from '@/processes/main/type'
import { CredentialGetValue } from '@/services/credential/type/detail'

export const usePluginToGetCredential = async (
  pluginId: string,
  context: MainProcessContext
): Promise<CredentialGetValue | undefined> => {
  const { browser } = await context.services.executor.openBrowser()

  const { get } = (
    await context.services.plugin.use<CredentialPlugin>(
      // '/Users/huihuangxu/Desktop/code/public/github/myself/mama-mia-plugin-default-credential/output/src'
      pluginId
    )
  ).data!

  const getDetail = async (): Promise<CredentialGetValue> => {
    const { data, ...others } = await get(browser)
    // add close task to next macro
    // result return first
    setTimeout(() => browser.close())

    return {
      ...others,
      dataId: await context.services.io.dataSnapshot.create(data),
    }
  }

  return await Promise.race([
    getDetail(),
    new Promise<undefined>((resolve) => {
      browser.on('disconnected', () => resolve(undefined))
    }),
  ])
}
