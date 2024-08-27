import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Estaciona Hub</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li>
          <a href="/relatorio">Relatórios</a>
        </li>
        <li>
          <a href="/formulario">Cadastro de Veículo</a>
        </li>
        <li>
          <a href="/tabela-de-veiculos">Tabela de Veículos</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
