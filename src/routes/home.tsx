import { Route } from 'react-router-dom'
import { Home } from '@/views/home'

export const home = (
  <>
    <Route path="home" element={<Home />} />
  </>
)
