import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import './Dashboard.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [totalSpots] = useState(100)
  const [usedSpots, setUsedSpots] = useState(0)
  const availableSpots = totalSpots - usedSpots

  const data = {
    labels: ['Vagas Totais', 'Vagas Disponíveis', 'Vagas em Uso'],
    datasets: [
      {
        label: 'Vagas',
        data: [totalSpots, availableSpots, usedSpots],
        backgroundColor: ['#007bff', '#28a745', '#ff0000'],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estatísticas do Estacionamento',
      },
    },
  }

  const handleAddCar = () => {
    if (availableSpots > 0) {
      setUsedSpots(usedSpots + 1)
    }
  }

  const handleRemoveCar = () => {
    if (usedSpots > 0) {
      setUsedSpots(usedSpots - 1)
    }
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-stats">
        Vagas Totais: <span>{totalSpots}</span>
      </p>
      <p className="dashboard-stats">
        Vagas Disponíveis: <span>{availableSpots}</span>
      </p>
      <p className="dashboard-stats">
        Vagas em Uso: <span>{usedSpots}</span>
      </p>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      <div className="button-container">
        <button onClick={handleAddCar} className="add-car-button">
          Adicionar Carro
        </button>
        <button onClick={handleRemoveCar} className="remove-car-button">
          Remover Carro
        </button>
      </div>
    </div>
  )
}

export default Dashboard
