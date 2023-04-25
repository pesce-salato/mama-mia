import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { routes } from '@/routes'
import { Scrollbar } from '@/components/scrollbar'
import { theme } from '@/theme'
import { Navbar } from '@/components/navbar'
import '@/i18n'
import 'normalize.css'
import './app.scss'

const App = () => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={['/preprocess']}>
          <Flex
            width="100%"
            height="100%"
            minWidth="0px"
            minHeight="0px"
            flexDirection="column"
          >
            <Navbar />
            <Box width="100%" flex={1} minWidth="0px" minHeight="0px">
              <Scrollbar onlyScrollVisible>{routes}</Scrollbar>
            </Box>
          </Flex>
        </MemoryRouter>
      </ChakraProvider>
    </RecoilRoot>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
