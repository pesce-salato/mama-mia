import { preprocess } from './preprocess'
import { Routes } from 'react-router-dom'
import { home } from '@/routes/home'

export const routes = (
  <Routes>
    {preprocess}
    {home}
  </Routes>
)
