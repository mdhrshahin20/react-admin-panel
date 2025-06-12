import * as types from './types'

export const setLoading = (loading) => ({ type: types.SET_LOADING, loading })
export const setError = (error) => ({ type: types.SET_ERROR, error })
export const setCustomers = (customers, pagination) => ({
  type: types.SET_CUSTOMERS, customers, pagination
})
export const setCustomer = (customer) => ({ type: types.SET_CUSTOMER, customer })
export const addCustomer = (customer) => ({ type: types.ADD_CUSTOMER, customer })
export const updateCustomer = (customer) => ({ type: types.UPDATE_CUSTOMER, customer })
export const removeCustomer = (id) => ({ type: types.REMOVE_CUSTOMER, id })
export const setFilters = (filters) => ({ type: types.SET_FILTERS, filters })
export const setSelectedCustomers = (ids) => ({ type: types.SET_SELECTED_CUSTOMERS, ids })
export const toggleCustomerSelection = (id) => ({ type: types.TOGGLE_CUSTOMER_SELECTION, id })
export const clearSelection = () => ({ type: types.CLEAR_SELECTION })
