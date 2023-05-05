export const dynamicScriptBuilder = <T = any>(
  script: string,
  returnStatement: string,
  that: any = undefined
): T => {
  const executor = new Function(`
  ${script}
  return ${returnStatement}
  `)

  return executor.call(that)
}
