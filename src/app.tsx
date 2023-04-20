import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { routes } from '@/routes'
import { Scrollbar } from '@/components/scrollbar'
import './app.scss'

const App = () => {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Scrollbar onlyScrollVisible>
          <MemoryRouter initialEntries={['/preprocess']}>{routes}</MemoryRouter>
        </Scrollbar>
      </ChakraProvider>
    </RecoilRoot>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
