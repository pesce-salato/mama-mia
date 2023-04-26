import { preprocess } from './preprocess'
import { Routes } from 'react-router-dom'
import { home } from '@/routes/home'
import { setting } from '@/routes/setting'

export const routes = (
  <Routes>
    {preprocess}
    {home}
    {setting}
  </Routes>
)
