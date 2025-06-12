import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function EventForm({ onSubmit, initialValues = {}, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    date: initialValues?.date ? new Date(initialValues.date) : new Date(),
    location: initialValues?.location || '',
    attendees: initialValues?.attendees || '',
    allDay: initialValues?.allDay || false,
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-primary-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input mt-1"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-primary-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="input mt-1"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-primary-700">
            Date & Time
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="input mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-primary-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input mt-1"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="attendees" className="block text-sm font-medium text-primary-700">
          Attendees (comma separated)
        </label>
        <input
          type="text"
          id="attendees"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          className="input mt-1"
          placeholder="john@example.com, jane@example.com"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="allDay"
          name="allDay"
          checked={formData.allDay}
          onChange={handleChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="allDay" className="ml-2 block text-sm text-primary-700">
          All day event
        </label>
      </div>
      
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
          {initialValues?.id ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  )
}

export default EventForm