export const dynamicScriptBuilder = <T = any>(
  script: string,
  that: any = undefined
): T => {
  const executor = new Function(
    script.replace(/export\s*({\s*[^{}]+?\s*});/, '\nreturn $1;')
  )

  return executor.call(that)
}
