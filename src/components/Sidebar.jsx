import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  RiDashboardLine, RiCalendarLine, RiCalendarEventLine,
  RiTeamLine, RiServiceLine, RiMapPinLine,
  RiUserLine, RiMoneyDollarCircleLine, RiNotification3Line,
  RiFileList3Line, RiListSettingsLine, RiSettings4Line,
  RiCloseLine
} from 'react-icons/ri'

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  const sidebarItems = [
    { name: 'Dashboard', path: '/', icon: RiDashboardLine },
    { name: 'Calendar', path: '/calendar', icon: RiCalendarLine },
    { name: 'Events', path: '/events', icon: RiCalendarEventLine },
    { name: 'Employees', path: '/employees', icon: RiTeamLine },
    { name: 'Services', path: '/services', icon: RiServiceLine },
    { name: 'Locations', path: '/locations', icon: RiMapPinLine },
    { name: 'Customers', path: '/customers', icon: RiUserLine },
    { name: 'Finance', path: '/finance', icon: RiMoneyDollarCircleLine },
    { name: 'Notifications', path: '/notifications', icon: RiNotification3Line },
    { name: 'Custom Forms', path: '/custom-forms', icon: RiFileList3Line },
    { name: 'Custom Fields', path: '/custom-fields', icon: RiListSettingsLine },
    { name: 'Settings', path: '/settings', icon: RiSettings4Line }
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
    
      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-900">AdminPanel</span>
            </Link>
            <button 
              onClick={() => toggleSidebar(false)}
              className="p-1 rounded-md lg:hidden hover:bg-gray-100"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar(false)}
              >
                <item.icon className="sidebar-icon" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* User profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center">
                <span className="text-primary-600 font-medium">AD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-primary-900">Admin User</p>
                <p className="text-xs text-primary-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar