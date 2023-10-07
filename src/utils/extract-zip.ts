import Extract from 'extract-zip'
import Fs from 'fs'
import Path from 'path'
import { mkdir } from 'fs/promises'
import { pipeline } from 'stream/promises'
import { ActionResult } from '@/@types/action'

export const extractZip = async (
  from: string,
  target: string
): Promise<ActionResult<boolean>> => {
  if (!Fs.existsSync(target)) {
    await mkdir(target)
  }

  const result: ActionResult<boolean> = {
    data: true,
  }

  try {
    await Extract(from, { dir: target })
    result.data = true
  } catch (e) {
    result.msg = e.toString()
    result.data = false
  }

  return result
}
