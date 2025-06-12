export const selectCustomerState = (state) => state.customer;
export const getCustomers = (state) =>{
    return selectCustomerState(state).customers;
}
export const getCustomer = (state) => {
    return selectCustomerState(state).customer
}
export const getLoading = (state) => {
    return selectCustomerState(state).loading
}
export const getError = (state) => {
    return selectCustomerState(state).error
}
export const getPagination = (state) => {
    return selectCustomerState(state).pagination
}
export const getFilters = (state) =>{
   return   selectCustomerState(state).filters
}
export const getSelectedCustomers = (state) => {
    return selectCustomerState(state).selectedCustomers
}
export const getTotalCustomers = (state) => {
    return selectCustomerState(state).pagination.total
}
export const getCurrentPage = (state) => {
    return selectCustomerState(state).pagination.currentPage
}
export const getTotalPages = (state) => {
    return selectCustomerState(state).pagination.totalPages
}
export const getCustomerById = (state, id) =>
    state.customers.find(customer => customer.id === id)
