export enum PluginType {
  credential = 'credential',
  node = 'node',
}

export interface PluginConfig {
  type: PluginType
  tags: string[]
  title: string
  description: string
}

export * from './credential'
