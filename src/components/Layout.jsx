import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout({ children, sidebarOpen, toggleSidebar }) {
  // Handle Escape key to close sidebar on mobile
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && window.innerWidth < 1024) {
        toggleSidebar(false)
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [toggleSidebar])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout