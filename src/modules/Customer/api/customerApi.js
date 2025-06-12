import apiFetch from '@wordpress/api-fetch'

// Customer API endpoints
const CUSTOMER_ENDPOINT = '/radius-booking/v1/customers'

export const customerApi = {
  // Fetch all customers with pagination and filters
  async fetchCustomers(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        per_page: params.per_page || 10,
        search: params.search || '',
        status: params.status || '',
        orderby: params.orderby || 'created_at',
        order: params.order || 'desc'
      }).toString()

      const response = await apiFetch({
        path: `${CUSTOMER_ENDPOINT}?${queryParams}`,
        method: 'GET'
      })

      return {
        data: response.data || [],
        total: response.total || 0,
        totalPages: response.total_pages || 1,
        currentPage: response.current_page || 1
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
      throw new Error('Failed to fetch customers')
    }
  },

  // Fetch single customer by ID
  async fetchCustomer(id) {
    try {
      const response = await apiFetch({
        path: `${CUSTOMER_ENDPOINT}/${id}`,
        method: 'GET'
      })
      return response.data
    } catch (error) {
      console.error('Error fetching customer:', error)
      throw new Error('Failed to fetch customer')
    }
  },

  // Create new customer
  async createCustomer(customerData) {
    try {
      const response = await apiFetch({
        path: CUSTOMER_ENDPOINT,
        method: 'POST',
        data: customerData
      })
      return response.data
    } catch (error) {
      console.error('Error creating customer:', error)
      throw new Error('Failed to create customer')
    }
  },

  // Update existing customer
  async updateCustomer(id, customerData) {
    try {
      const response = await apiFetch({
        path: `${CUSTOMER_ENDPOINT}/${id}`,
        method: 'PUT',
        data: customerData
      })
      return response.data
    } catch (error) {
      console.error('Error updating customer:', error)
      throw new Error('Failed to update customer')
    }
  },

  // Delete customer
  async deleteCustomer(id) {
    try {
      const response = await apiFetch({
        path: `${CUSTOMER_ENDPOINT}/${id}`,
        method: 'DELETE'
      })
      return response.success
    } catch (error) {
      console.error('Error deleting customer:', error)
      throw new Error('Failed to delete customer')
    }
  },

  // Bulk delete customers
  async bulkDeleteCustomers(ids) {
    try {
      const response = await apiFetch({
        path: `${CUSTOMER_ENDPOINT}/bulk-delete`,
        method: 'POST',
        data: { ids }
      })
      return response.success
    } catch (error) {
      console.error('Error bulk deleting customers:', error)
      throw new Error('Failed to delete customers')
    }
  }
}