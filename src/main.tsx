Import { StrictMode } from 'react'
Import { createRoot } from 'react-dom/client'
Import App from './App.tsx'
Import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
