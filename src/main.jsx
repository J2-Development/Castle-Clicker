import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CastleCapitalist from '../castle-capitalist.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <CastleCapitalist />
    </ErrorBoundary>
  </StrictMode>,
)
