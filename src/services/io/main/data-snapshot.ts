import { io } from '@/services/io'
import Fs from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'
import Path from 'path'
import { nanoid } from 'nanoid'

export class DataSnapshot {
  private dir = io.config.path.dataSnapshot

  constructor() {
    // todo: ioService 统一初始化
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir)
    }
  }

  public create = async <T = any>(data: T): Promise<string | undefined> => {
    try {
      const id = nanoid()
      await Fs.writeFile(
        Path.join(this.dir, `${id}.json`),
        JSON.stringify(data, null, 2)
      )
      return id
    } catch (e) {
      console.error(e)
      return undefined
    }
  }

  public get = async <T = any>(id: string): Promise<T | undefined> => {
    try {
      const result = await Fs.readFile(Path.join(this.dir, `${id}.json`))
      return JSON.parse(result.toString())
    } catch {
      return undefined
    }
  }

  public delete = async (id: string) => {
    try {
      await Fs.unlink(Path.join(this.dir, `${id}.json`))
      return true
    } catch {
      return false
    }
  }
}
