import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.storage = {
  async get(key) {
    const v = localStorage.getItem(key)
    return v ? { value: v } : null
  },
  async set(key, value) {
    localStorage.setItem(key, value)
    return { key, value }
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
