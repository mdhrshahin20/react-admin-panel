import { Routes, Route } from 'react-router-dom'
import routes from './routes'
import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <hr className="wp-header-end" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              {routes.map((route) => {
                const Element = route.element
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Element />}
                  />
                )
              })}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App