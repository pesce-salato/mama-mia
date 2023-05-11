import { Route } from 'react-router-dom'
import { Credentials } from '@/views/credentials'

export const credentials = (
  <>
    <Route path="credentials" element={<Credentials />} />
  </>
)
