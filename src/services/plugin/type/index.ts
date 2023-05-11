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

export interface PluginDetail {
  id: string
  localDevPath?: string
}

export interface PluginDetailWithConfig extends PluginDetail {
  config: PluginConfig
}

export * from './credential'
