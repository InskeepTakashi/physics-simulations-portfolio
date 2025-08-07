import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Bounce from './Bounce.jsx'
import Orbit from './Orbit.jsx'
import Ring from './Ring.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bounce />
    <Orbit />
    <Ring />
  </StrictMode>,
)
