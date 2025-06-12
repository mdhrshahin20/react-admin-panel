import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import PageHeader from '../components/PageHeader'
import CalendarView from '../components/Calendar/CalendarView'
import EventForm from '../components/Calendar/EventForm'
import Modal from '../components/Modal'

function Calendar() {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Haircut - John Doe',
      description: 'Regular haircut appointment',
      date: new Date(2025, 0, 15, 10, 0),
      location: 'Main Location',
      attendees: 'john@example.com',
      allDay: false
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly staff meeting',
      date: new Date(2025, 0, 18, 14, 0),
      location: 'Conference Room',
      attendees: 'all@example.com',
      allDay: false
    },
    {
      id: 3,
      title: 'Manicure - Jane Smith',
      description: 'Gel manicure appointment',
      date: new Date(2025, 0, 20, 15, 30),
      location: 'Main Location',
      attendees: 'jane@example.com',
      allDay: false
    },
    {
      id: 4,
      title: 'Inventory Day',
      description: 'Monthly inventory check',
      date: new Date(2025, 0, 25, 9, 0),
      location: 'All Locations',
      attendees: 'staff@example.com',
      allDay: true
    }
  ])
  
  const [currentEvent, setCurrentEvent] = useState(null)
  
  const handleCreateEvent = () => {
    setCurrentEvent(null)
    setIsEventModalOpen(true)
  }
  
  const handleEditEvent = (event) => {
    setCurrentEvent(event)
    setIsEventModalOpen(true)
  }
  
  const handleSubmitEvent = (eventData) => {
    if (currentEvent) {
      // Edit existing event
      setEvents(events.map(event => 
        event.id === currentEvent.id ? { ...eventData, id: event.id } : event
      ))
    } else {
      // Create new event
      const newEvent = {
        ...eventData,
        id: Date.now() // Use timestamp as ID
      }
      setEvents([...events, newEvent])
    }
    
    setIsEventModalOpen(false)
  }

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Calendar" 
        description="Manage appointments and scheduled events."
        actions={
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleCreateEvent}
          >
            <RiAddLine className="w-5 h-5" />
            <span>New Event</span>
          </button>
        }
      />
      
      <CalendarView events={events} />
      
      {/* Event Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title={currentEvent ? 'Edit Event' : 'Create New Event'}
      >
        <EventForm
          onSubmit={handleSubmitEvent}
          initialValues={currentEvent}
          onCancel={() => setIsEventModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Calendar