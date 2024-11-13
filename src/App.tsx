import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ModelManager } from './components/ModelManager'
import { NavBar } from './components/NavBar'

export function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<ModelManager />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}