import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Head from 'next/head'
import Bounce from './Bounce.jsx'
import Orbit from './Orbit.jsx'
import Ring from './Ring.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Head>
      <title>Physics Simulations Portfolio</title>
    </Head>
    <h1>Takashi Inskeep</h1>
    <Bounce />
    <Orbit />
    <Ring />
  </StrictMode>,
)
