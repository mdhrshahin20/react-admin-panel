import { useState } from 'react'
import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, 
  isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { motion } from 'framer-motion'

function CalendarView({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())
  const [view, setView] = useState('month') // month, week, day
  
  const onDateClick = (day) => {
    setActiveDate(day)
  }
  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }
  
  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }
  
  const prevWeek = () => {
    setCurrentDate(subDays(currentDate, 7))
  }
  
  const nextDay = () => {
    setCurrentDate(addDays(currentDate, 1))
  }
  
  const prevDay = () => {
    setCurrentDate(subDays(currentDate, 1))
  }
  
  const onNext = () => {
    if (view === 'month') {
      nextMonth()
    } else if (view === 'week') {
      nextWeek()
    } else {
      nextDay()
    }
  }
  
  const onPrev = () => {
    if (view === 'month') {
      prevMonth()
    } else if (view === 'week') {
      prevWeek()
    } else {
      prevDay()
    }
  }
  
  const renderHeader = () => {
    const dateFormat = {
      month: 'MMMM yyyy',
      week: "'Week of' MMM d, yyyy",
      day: 'EEEE, MMMM d, yyyy'
    }
    
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            className="btn btn-outline text-sm"
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button
            className="btn btn-outline text-sm"
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button
            className="btn btn-outline text-sm"
            onClick={() => setView('day')}
          >
            Day
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={onPrev} className="p-1 rounded hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, dateFormat[view])}
          </h2>
          <button onClick={onNext} className="p-1 rounded hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <button
          className="btn btn-outline text-sm"
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </button>
      </div>
    )
  }
  
  const renderDays = () => {
    const dateFormat = 'EEEEE'
    const days = []
    const startDate = startOfWeek(currentDate)
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center py-2 font-medium text-sm text-gray-500" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    
    return <div className="grid grid-cols-7">{days}</div>
  }
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    
    const rows = []
    let days = []
    let day = startDate
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const formattedDate = format(day, 'd')
        
        // Find events for this day
        const dayEvents = events.filter(event => 
          isSameDay(new Date(event.date), day)
        )
        
        days.push(
          <div
            className={`h-24 sm:h-32 border border-gray-200 p-1 ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-300 bg-gray-50'
                : isSameDay(day, activeDate) 
                  ? 'bg-primary-50 border-primary-200'
                  : 'text-gray-700'
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between">
              <span className="text-sm font-medium">{formattedDate}</span>
              {dayEvents.length > 0 && (
                <span className="text-xs font-medium bg-primary-100 text-primary-800 px-1.5 rounded-full">
                  {dayEvents.length}
                </span>
              )}
            </div>
            <div className="overflow-y-auto max-h-20 mt-1">
              {dayEvents.slice(0, 2).map((event, idx) => (
                <div key={idx} className="text-xs mb-1 truncate bg-white p-1 rounded shadow-sm">
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-primary-500 font-medium">
                  + {dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      )
      days = []
    }
    
    return <div className="grid grid-cols-1 gap-0">{rows}</div>
  }
  
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const weekEnd = endOfWeek(currentDate)
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
    
    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 border-b border-gray-200 min-w-[800px]">
          <div className="border-r border-gray-200 p-2 bg-gray-50"></div>
          {Array.from({ length: 7 }).map((_, i) => {
            const day = addDays(weekStart, i)
            return (
              <div 
                key={i} 
                className={`p-2 text-center border-r border-gray-200 ${
                  isSameDay(day, new Date()) ? 'bg-primary-50' : ''
                }`}
              >
                <div className="font-medium">{format(day, 'EEE')}</div>
                <div>{format(day, 'd')}</div>
              </div>
            )
          })}
        </div>
        
        <div className="grid grid-cols-8 min-w-[800px]">
          <div className="border-r border-gray-200">
            {hours.map(hour => (
              <div key={hour} className="h-20 border-b border-gray-200 p-1 text-xs text-right pr-2 text-gray-500">
                {hour % 12 || 12} {hour >= 12 ? 'PM' : 'AM'}
              </div>
            ))}
          </div>
          
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const day = addDays(weekStart, dayIndex)
            
            // Filter events for this day
            const dayEvents = events.filter(event => 
              isSameDay(new Date(event.date), day)
            )
            
            return (
              <div key={dayIndex} className="border-r border-gray-200">
                {hours.map(hour => {
                  // Filter events for this hour
                  const hourEvents = dayEvents.filter(event => {
                    const eventDate = new Date(event.date)
                    return eventDate.getHours() === hour
                  })
                  
                  return (
                    <div key={hour} className="h-20 border-b border-gray-200 p-1 relative">
                      {hourEvents.map((event, idx) => (
                        <div
                          key={idx}
                          className="absolute bg-primary-100 border-l-4 border-primary-500 p-1 text-xs rounded"
                          style={{
                            top: `${(idx * 20) + 2}%`,
                            left: '2%',
                            width: '96%',
                            height: '80%',
                          }}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="truncate text-primary-600">{event.description}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  const renderDayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
    
    // Filter events for current day
    const dayEvents = events.filter(event => 
      isSameDay(new Date(event.date), currentDate)
    )
    
    return (
      <div className="border rounded-lg overflow-hidden">
        {hours.map(hour => {
          // Filter events for this hour
          const hourEvents = dayEvents.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate.getHours() === hour
          })
          
          return (
            <div key={hour} className="flex border-b border-gray-200 last:border-b-0">
              <div className="w-20 p-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-500">
                {hour % 12 || 12} {hour >= 12 ? 'PM' : 'AM'}
              </div>
              <div className="flex-1 min-h-24 p-2 relative">
                {hourEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white border-l-4 border-primary-500 p-2 mb-2 rounded shadow-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600">{event.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl shadow-subtle p-4">
      {renderHeader()}
      
      {view === 'month' && (
        <>
          {renderDays()}
          {renderCells()}
        </>
      )}
      
      {view === 'week' && renderWeekView()}
      
      {view === 'day' && renderDayView()}
    </div>
  )
}

export default CalendarView