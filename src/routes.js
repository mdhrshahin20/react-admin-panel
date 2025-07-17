import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Events from './pages/Events'
import Employees from './pages/Employees'
import Services from './pages/Services'
import Locations from './pages/Locations'
import Customers from './pages/Customers'
import Finance from './pages/Finance'
import Notifications from './pages/Notifications'
import CustomForms from './pages/CustomForms'
import CustomFields from './pages/CustomFields'
import Settings from './pages/Settings'
import AddServiceForm from './pages/AddServiceForm'

const routes = [
  {
    path: '/',
    element: Dashboard,
  },
  {
    path: '/calendar',
    element: Calendar,
  },
  {
    path: '/events',
    element: Events,
  },
  {
    path: '/employees',
    element: Employees,
  },
  {
    path: '/services',
    element: Services,
  },
  {
    path: '/locations',
    element: Locations,
  },
  {
    path: '/customers',
    element: Customers,
  },
  {
    path: '/finance',
    element: Finance,
  },
  {
    path: '/notifications',
    element: Notifications,
  },
  {
    path: '/custom-forms',
    element: CustomForms,
  },
  {
    path: '/custom-fields',
    element: CustomFields,
  },
  {
    path: '/settings',
    element: Settings,
  },
  {
    path: '/add-service',
    element: AddServiceForm,
  }
]

export default routes