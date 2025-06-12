import { useState } from 'react'

function CrudForm({ fields, initialValues = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: initialValues[field.name] || ''
    }), {})
  )

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-primary-700">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="input mt-1"
              rows={3}
              required={field.required}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="input mt-1"
              required={field.required}
            />
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialValues.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default CrudForm