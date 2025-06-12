import { useState } from 'react'
import { RiMenu2Line, RiNotification3Line, RiSearchLine, RiArrowDownSLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'

function Header({ toggleSidebar }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen)
  
  const notifications = [
    { id: 1, text: 'New customer registration', time: '10 minutes ago' },
    { id: 2, text: 'Staff meeting reminder', time: '1 hour ago' },
    { id: 3, text: 'New appointment booked', time: '3 hours ago' }
  ]

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={() => toggleSidebar()}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <RiMenu2Line className="w-6 h-6" />
            </button>
            
            <div className="hidden md:block ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <RiSearchLine className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-2 pl-10 pr-4 w-64 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none relative"
              >
                <RiNotification3Line className="w-6 h-6" />
                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-900">{notification.text}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">AD</span>
                </div>
                <div className="hidden md:flex items-center">
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <RiArrowDownSLine className="ml-1 w-5 h-5 text-gray-400" />
                </div>
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header