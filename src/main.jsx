import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// bootstrap
import './assets/bootstrap/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
