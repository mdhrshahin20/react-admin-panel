import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { customerFormFields } from '../schemas/customerSchema'

function CustomerForm({ customer, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Initialize form data
  useEffect(() => {
    const initialData = customerFormFields.reduce((acc, field) => {
      acc[field.name] = customer?.[field.name] || ''
      return acc
    }, {})
    setFormData(initialData)
    setErrors({})
    setTouched({})
  }, [customer])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle input blur
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, formData[name])
  }

  // Validate individual field
  const validateField = (name, value) => {
    const field = customerFormFields.find(f => f.name === name)
    if (!field) return

    let error = ''

    // Required validation
    if (field.required && (!value || value.trim() === '')) {
      error = `${field.label} is required`
    }
    // Pattern validation
    else if (value && field.validation?.pattern && !field.validation.pattern.test(value)) {
      error = `Please enter a valid ${field.label.toLowerCase()}`
    }
    // Length validation
    else if (value && field.validation?.minLength && value.length < field.validation.minLength) {
      error = `${field.label} must be at least ${field.validation.minLength} characters`
    }
    else if (value && field.validation?.maxLength && value.length > field.validation.maxLength) {
      error = `${field.label} must not exceed ${field.validation.maxLength} characters`
    }

    setErrors(prev => ({ ...prev, [name]: error }))
    return error
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    customerFormFields.forEach(field => {
      const error = validateField(field.name, formData[field.name])
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    setTouched(customerFormFields.reduce((acc, field) => {
      acc[field.name] = true
      return acc
    }, {}))

    return isValid
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Render form field
  const renderField = (field) => {
    const hasError = touched[field.name] && errors[field.name]
    
    return (
      <motion.div
        key={field.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-1"
      >
        <label htmlFor={field.name} className="block text-sm font-medium text-primary-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className={`input ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            disabled={loading}
          />
        ) : (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            className={`input ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            disabled={loading}
          />
        )}
        
        {hasError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-sm text-red-600"
          >
            {errors[field.name]}
          </motion.p>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customerFormFields.map(renderField)}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary flex items-center gap-2"
          disabled={loading}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {customer ? 'Update Customer' : 'Create Customer'}
        </button>
      </div>
    </form>
  )
}

export default CustomerForm