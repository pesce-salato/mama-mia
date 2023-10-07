export enum PluginType {
  credential = 'credential',
  node = 'node',
}

export enum PluginCheckStatus {
  configError = 'configError',
  alreadyExist = 'alreadyExist',
}

export interface PluginCheckConfigError {
  type: PluginCheckStatus.configError
}

export interface PluginCheckAlreadyExist {
  type: PluginCheckStatus.alreadyExist
  version: string
}

export type PluginCheckResult =
  | PluginCheckConfigError
  | PluginCheckAlreadyExist
  | true

export interface PluginConfig {
  identifier: string
  type: PluginType
  tags: string[]
  title: string
  description: string
  version: string
}

export interface PluginDetail {
  id: string
  importedDate: string
  localDevPath?: string
  isDefault?: boolean
}

export interface PluginDetailWithConfig extends PluginDetail {
  config: PluginConfig
}

export interface PluginSearchCondition {
  type?: PluginType
}

export * from './credential'
