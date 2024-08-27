import React, { useState } from 'react'
import './FormPage.css'
import { CheckCircle, Cancel } from '@mui/icons-material' // Importando ícones do Material-UI

const FormPage = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    cpf: '',
    phone: '',
    email: '',
    vehiclePlate: '',
    vehicleModel: '',
    yearOfManufacture: '',
    vehicleColor: '',
  })
  const [assignedSpot, setAssignedSpot] = useState(null)
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const validateField = (name, value) => {
    let error = ''
    let isValid = false

    switch (name) {
      case 'ownerName':
        isValid = /^[A-Za-z\s]+$/.test(value)
        error = isValid ? '' : 'Nome inválido. Use apenas letras e espaços.'
        break
      case 'cpf':
        isValid = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value)
        error = isValid ? '' : 'CPF inválido. Formato esperado: 000.000.000-00.'
        break
      case 'phone':
        isValid = /^\(\d{2}\)\s\d{4,5}\-\d{4}$/.test(value)
        error = isValid
          ? ''
          : 'Número de telefone inválido. Formato esperado: (11) 12345-6789.'
        break
      case 'email':
        isValid = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value)
        error = isValid
          ? ''
          : 'Email inválido. Por favor, insira um email válido.'
        break
      case 'vehiclePlate':
        isValid = /^[A-Z]{3}\-\d{4}$/.test(value)
        error = isValid
          ? ''
          : 'Placa do veículo inválida. Formato esperado: ABC-1234.'
        break
      case 'yearOfManufacture':
        const currentYear = new Date().getFullYear()
        isValid = value >= 1900 && value <= currentYear
        error = isValid
          ? ''
          : `Ano de fabricação inválido. Deve estar entre 1900 e ${currentYear}.`
        break
      default:
        isValid = value.trim() !== ''
        error = isValid ? '' : 'Campo obrigatório.'
        break
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    const isValid = validateField(name, value)
    setIsFormValid(
      Object.keys(formData).every((key) => validateField(key, formData[key]))
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}

    Object.keys(formData).forEach((key) => {
      const isValid = validateField(key, formData[key])
      if (!isValid) validationErrors[key] = errors[key]
    })

    if (Object.keys(validationErrors).length === 0 && isFormValid) {
      const spot = onFormSubmit(formData)
      setAssignedSpot(spot)
      setFormData({
        ownerName: '',
        cpf: '',
        phone: '',
        email: '',
        vehiclePlate: '',
        vehicleModel: '',
        yearOfManufacture: '',
        vehicleColor: '',
      })
      setIsFormValid(false)
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <div className="form-page-container">
      <h1>Cadastro de Veículo</h1>
      <form onSubmit={handleSubmit}>
        {[
          'ownerName',
          'cpf',
          'phone',
          'email',
          'vehiclePlate',
          'vehicleModel',
          'yearOfManufacture',
          'vehicleColor',
        ].map((field, index) => (
          <div key={index} className="form-field">
            <label>{field}</label>
            <input
              type={field === 'yearOfManufacture' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
            <span className="icon">
              {formData[field] && errors[field] ? (
                <Cancel style={{ color: 'red' }} />
              ) : null}
              {formData[field] && !errors[field] ? (
                <CheckCircle style={{ color: 'green' }} />
              ) : null}
            </span>
            {errors[field] && <p className="error-message">{errors[field]}</p>}
          </div>
        ))}

        <button type="submit" disabled={!isFormValid}>
          Enviar
        </button>
      </form>
      {assignedSpot && (
        <p className="assigned-spot-message">
          Seu carro foi registrado com sucesso! Estacione na vaga número:{' '}
          {assignedSpot}
        </p>
      )}
    </div>
  )
}

export default FormPage
