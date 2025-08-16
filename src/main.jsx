import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Bounce from './Bounce.jsx'
import Orbit from './Orbit.jsx'
import Ring from './Ring.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Physics Simulations Portfolio</h1>
    <hr />
    <h2>Takashi Inskeep</h2>
    <div>
      GitHub Repository: https://github.com/InskeepTakashi/physics-simulations-portfolio
    </div>
    <Bounce />
    <Orbit />
    <Ring />
  </StrictMode>,
)
