import { createReduxStore, register } from '@wordpress/data'

// Initial state
const initialState = {
  customers: [],
  customer: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    totalPages: 1,
    currentPage: 1,
    perPage: 10
  },
  filters: {
    search: '',
    status: '',
    orderby: 'created_at',
    order: 'desc'
  },
  selectedCustomers: []
}

// Actions
const actions = {
  setLoading: (loading) => ({ type: 'SET_LOADING', loading }),
  setError: (error) => ({ type: 'SET_ERROR', error }),
  setCustomers: (customers, pagination) => ({ 
    type: 'SET_CUSTOMERS', 
    customers, 
    pagination 
  }),
  setCustomer: (customer) => ({ type: 'SET_CUSTOMER', customer }),
  addCustomer: (customer) => ({ type: 'ADD_CUSTOMER', customer }),
  updateCustomer: (customer) => ({ type: 'UPDATE_CUSTOMER', customer }),
  removeCustomer: (id) => ({ type: 'REMOVE_CUSTOMER', id }),
  setFilters: (filters) => ({ type: 'SET_FILTERS', filters }),
  setSelectedCustomers: (ids) => ({ type: 'SET_SELECTED_CUSTOMERS', ids }),
  toggleCustomerSelection: (id) => ({ type: 'TOGGLE_CUSTOMER_SELECTION', id }),
  clearSelection: () => ({ type: 'CLEAR_SELECTION' })
}

// Selectors
const selectors = {
  getCustomers: (state) => state.customers,
  getCustomer: (state) => state.customer,
  getLoading: (state) => state.loading,
  getError: (state) => state.error,
  getPagination: (state) => state.pagination,
  getFilters: (state) => state.filters,
  getSelectedCustomers: (state) => state.selectedCustomers,
  getTotalCustomers: (state) => state.pagination.total,
  getCurrentPage: (state) => state.pagination.currentPage,
  getTotalPages: (state) => state.pagination.totalPages,
  getCustomerById: (state, id) => state.customers.find(customer => customer.id === id)
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false }
    
    case 'SET_CUSTOMERS':
      return { 
        ...state, 
        customers: action.customers,
        pagination: action.pagination,
        loading: false,
        error: null
      }
    
    case 'SET_CUSTOMER':
      return { ...state, customer: action.customer, loading: false }
    
    case 'ADD_CUSTOMER':
      return { 
        ...state, 
        customers: [action.customer, ...state.customers],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1
        }
      }
    
    case 'UPDATE_CUSTOMER':
      return { 
        ...state, 
        customers: state.customers.map(customer => 
          customer.id === action.customer.id ? action.customer : customer
        ),
        customer: state.customer?.id === action.customer.id ? action.customer : state.customer
      }
    
    case 'REMOVE_CUSTOMER':
      return { 
        ...state, 
        customers: state.customers.filter(customer => customer.id !== action.id),
        pagination: {
          ...state.pagination,
          total: Math.max(0, state.pagination.total - 1)
        },
        selectedCustomers: state.selectedCustomers.filter(id => id !== action.id)
      }
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.filters } }
    
    case 'SET_SELECTED_CUSTOMERS':
      return { ...state, selectedCustomers: action.ids }
    
    case 'TOGGLE_CUSTOMER_SELECTION':
      const isSelected = state.selectedCustomers.includes(action.id)
      return {
        ...state,
        selectedCustomers: isSelected
          ? state.selectedCustomers.filter(id => id !== action.id)
          : [...state.selectedCustomers, action.id]
      }
    
    case 'CLEAR_SELECTION':
      return { ...state, selectedCustomers: [] }
    
    default:
      return state
  }
}

// Create and register the store
const customerStore = createReduxStore('radius-booking/customers', {
  reducer,
  actions,
  selectors
})

register(customerStore)

export default customerStore