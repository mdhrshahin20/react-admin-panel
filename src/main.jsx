import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './scss/main.scss'
import './lib/wordpress-data-setup.js'

const root = document.getElementById('radius-booking')
if (root) {
    ReactDOM.createRoot(root).render(<App />)
}