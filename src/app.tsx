import { createRoot } from 'react-dom/client'
import { Preprocess } from './views/preprocess'

const App = () => {
  return <Preprocess />
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
