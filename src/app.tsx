import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { routes } from '@/routes'
import { Scrollbar } from '@/components/scrollbar'
import { Sidebar } from '@/components/sidebar'
import '@/i18n'
import 'normalize.css'
import './app.scss'
import { Navbar } from '@/components/navbar'

const App = () => {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <MemoryRouter initialEntries={['/preprocess']}>
          <Flex
            width="100%"
            height="100%"
            minWidth="0px"
            minHeight="0px"
            flexDirection="column"
          >
            <Navbar />
            <Flex width="100%" flex={1} minWidth="0px" minHeight="0px">
              <Sidebar />
              <Box flex={1} height="100%" minWidth="0px">
                <Scrollbar onlyScrollVisible>{routes}</Scrollbar>
              </Box>
            </Flex>
          </Flex>
        </MemoryRouter>
      </ChakraProvider>
    </RecoilRoot>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
