export enum PluginType {
  credential = 'credential',
  node = 'node',
}

export interface PluginConfig {
  type: PluginType
}
