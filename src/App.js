import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import FormPage from './components/FormPage'
import Navbar from './components/Navbar'

function App() {
  const [totalSpots] = useState(100)
  const [usedSpots, setUsedSpots] = useState(20)
  const [formSubmissions, setFormSubmissions] = useState([])

  const handleFormSubmit = (formData) => {
    if (usedSpots < totalSpots) {
      const assignedSpot = usedSpots + 1
      const updatedFormData = { ...formData, assignedSpot }
      setFormSubmissions([...formSubmissions, updatedFormData])
      setUsedSpots(usedSpots + 1)
      return assignedSpot
    } else {
      alert('Não há vagas disponíveis.')
      return null
    }
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Dashboard totalSpots={totalSpots} usedSpots={usedSpots} />}
        />
        <Route
          path="/formulario"
          element={<FormPage onFormSubmit={handleFormSubmit} />}
        />
      </Routes>
    </Router>
  )
}

export default App
