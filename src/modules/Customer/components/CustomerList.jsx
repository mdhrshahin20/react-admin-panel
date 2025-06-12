import { useState, useEffect } from 'react'
import { useSelect, useDispatch } from '@wordpress/data'
import { RiAddLine, RiEditLine, RiDeleteBin6Line, RiSearchLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import DataTable from '../../../components/DataTable'
import CustomerForm from './CustomerForm'
import DeleteCustomerModal from './DeleteCustomerModal'
import Modal from '../../../components/Modal'
import { customerApi } from '../api/customerApi'
import { customerTableColumns, customerSearchFields } from '../schemas/customerSchema'

function CustomerList() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [customerToDelete, setCustomerToDelete] = useState(null)

  // Redux selectors
  const {
    customers,
    loading,
    error,
    pagination,
    filters,
    selectedCustomers
  } = useSelect((select) => ({
    customers: select('radius-booking/customers').getCustomers(),
    loading: select('radius-booking/customers').getLoading(),
    error: select('radius-booking/customers').getError(),
    pagination: select('radius-booking/customers').getPagination(),
    filters: select('radius-booking/customers').getFilters(),
    selectedCustomers: select('radius-booking/customers').getSelectedCustomers()
  }))

  // Redux actions
  const {
    setLoading,
    setError,
    setCustomers,
    addCustomer,
    updateCustomer,
    removeCustomer,
    setFilters,
    setSelectedCustomers,
    toggleCustomerSelection,
    clearSelection
  } = useDispatch('radius-booking/customers')

  // Load customers on component mount and when filters change
  useEffect(() => {
    loadCustomers()
  }, [filters, pagination.currentPage])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      const response = await customerApi.fetchCustomers({
        page: pagination.currentPage,
        per_page: pagination.perPage,
        ...filters
      })
      setCustomers(response.data, {
        total: response.total,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        perPage: pagination.perPage
      })
    } catch (err) {
      setError(err.message)
    }
  }

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters({ search: searchTerm })
  }

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters({ [filterName]: value })
  }

  // Handle create customer
  const handleCreateCustomer = () => {
    setCurrentCustomer(null)
    setIsFormModalOpen(true)
  }

  // Handle edit customer
  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer)
    setIsFormModalOpen(true)
  }

  // Handle delete customer
  const handleDeleteCustomer = (customer) => {
    setCustomerToDelete(customer)
    setIsDeleteModalOpen(true)
  }

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true)
      if (currentCustomer) {
        // Update existing customer
        const updatedCustomer = await customerApi.updateCustomer(currentCustomer.id, formData)
        updateCustomer(updatedCustomer)
      } else {
        // Create new customer
        const newCustomer = await customerApi.createCustomer(formData)
        addCustomer(newCustomer)
      }
      setIsFormModalOpen(false)
      setCurrentCustomer(null)
    } catch (err) {
      setError(err.message)
    }
  }

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true)
      await customerApi.deleteCustomer(customerToDelete.id)
      removeCustomer(customerToDelete.id)
      setIsDeleteModalOpen(false)
      setCustomerToDelete(null)
    } catch (err) {
      setError(err.message)
    }
  }

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedCustomers.length === 0) return
    
    try {
      setLoading(true)
      await customerApi.bulkDeleteCustomers(selectedCustomers)
      selectedCustomers.forEach(id => removeCustomer(id))
      clearSelection()
    } catch (err) {
      setError(err.message)
    }
  }

  // Table columns with actions
  const columns = [
    ...customerTableColumns.filter(col => col.accessor !== 'actions'),
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditCustomer(row.original)}
            className="p-1 text-primary-600 hover:text-primary-900 transition-colors"
            title="Edit Customer"
          >
            <RiEditLine className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteCustomer(row.original)}
            className="p-1 text-red-600 hover:text-red-900 transition-colors"
            title="Delete Customer"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ]

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error: {error}</p>
        <button 
          onClick={loadCustomers}
          className="mt-2 btn btn-outline text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-900">Customers</h1>
          <p className="text-primary-600">Manage your customer database</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedCustomers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="btn bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
            >
              <RiDeleteBin6Line className="w-4 h-4" />
              Delete Selected ({selectedCustomers.length})
            </button>
          )}
          <button
            onClick={handleCreateCustomer}
            className="btn btn-primary flex items-center gap-2"
          >
            <RiAddLine className="w-5 h-5" />
            New Customer
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DataTable
          columns={columns}
          data={customers}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => setFilters({ currentPage: page })}
          onPageSizeChange={(size) => setFilters({ perPage: size })}
          selectable={true}
          selectedRows={selectedCustomers}
          onRowSelect={toggleCustomerSelection}
          onSelectAll={(ids) => setSelectedCustomers(ids)}
        />
      </motion.div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setCurrentCustomer(null)
        }}
        title={currentCustomer ? 'Edit Customer' : 'New Customer'}
        size="lg"
      >
        <CustomerForm
          customer={currentCustomer}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormModalOpen(false)
            setCurrentCustomer(null)
          }}
          loading={loading}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteCustomerModal
        isOpen={isDeleteModalOpen}
        customer={customerToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setCustomerToDelete(null)
        }}
        loading={loading}
      />
    </div>
  )
}

export default CustomerList