import { Suspense } from 'react'
import CustomerList from './components/CustomerList'

// Loading component
const CustomerLoading = () => (
  <div className="flex items-center justify-center min-h-64">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-primary-600">Loading customers...</p>
    </div>
  </div>
)

// Main Customer module component
function CustomerModule() {
  return (
    <div className="animate-fade-in">
      <Suspense fallback={<CustomerLoading />}>
        <CustomerList />
      </Suspense>
    </div>
  )
}

export default CustomerModule