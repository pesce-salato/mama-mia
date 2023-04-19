import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { routes } from './routes'

const App = () => {
  return (
    <ChakraProvider>
      <MemoryRouter initialEntries={['/preprocess']}>{routes}</MemoryRouter>
    </ChakraProvider>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
