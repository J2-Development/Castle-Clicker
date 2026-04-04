import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CastleCapitalist from '../castle-capitalist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CastleCapitalist />
  </StrictMode>,
)
