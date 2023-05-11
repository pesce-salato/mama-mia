import { preprocess } from './preprocess'
import { Routes } from 'react-router-dom'
import { home } from '@/routes/home'
import { setting } from '@/routes/setting'
import { credentials } from '@/routes/credentials'
import { plugins } from '@/routes/plugins'

export const routes = (
  <Routes>
    {preprocess}
    {home}
    {setting}
    {credentials}
    {plugins}
  </Routes>
)
