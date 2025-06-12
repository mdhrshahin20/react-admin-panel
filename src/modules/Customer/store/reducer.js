import * as types from './types'

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.loading }

    case types.SET_ERROR:
      return { ...state, error: action.error, loading: false }

    case types.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.customers,
        pagination: action.pagination,
        loading: false,
        error: null
      }

    case types.SET_CUSTOMER:
      return { ...state, customer: action.customer, loading: false }

    case types.ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.customer, ...state.customers],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1
        }
      }

    case types.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map(c =>
            c.id === action.customer.id ? action.customer : c
        ),
        customer:
            state.customer?.id === action.customer.id ? action.customer : state.customer
      }

    case types.REMOVE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(c => c.id !== action.id),
        pagination: {
          ...state.pagination,
          total: Math.max(0, state.pagination.total - 1)
        },
        selectedCustomers: state.selectedCustomers.filter(id => id !== action.id)
      }

    case types.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.filters } }

    case types.SET_SELECTED_CUSTOMERS:
      return { ...state, selectedCustomers: action.ids }

    case types.TOGGLE_CUSTOMER_SELECTION:
      const isSelected = state.selectedCustomers.includes(action.id)
      return {
        ...state,
        selectedCustomers: isSelected
            ? state.selectedCustomers.filter(id => id !== action.id)
            : [...state.selectedCustomers, action.id]
      }

    case types.CLEAR_SELECTION:
      return { ...state, selectedCustomers: [] }

    default:
      return state
  }
}

export default reducer
