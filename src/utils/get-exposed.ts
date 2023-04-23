import { Services } from '@/services/renderer'

export interface PreloadExposed {
  services: Services
}

export const getExposed = () => window as unknown as PreloadExposed
