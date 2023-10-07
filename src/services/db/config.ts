import Path from 'path'
import { io } from '@/services/io'

export const config = {
  credentials: Path.join(io.config.path.db, 'credentials.json'),
  plugins: Path.join(io.config.path.db, 'plugins.json'),
}
