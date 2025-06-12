import { motion, AnimatePresence } from 'framer-motion'
import { RiAlertLine, RiDeleteBin6Line } from 'react-icons/ri'

function DeleteCustomerModal({ isOpen, customer, onConfirm, onCancel, loading = false }) {
  if (!customer) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Header */}
                <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <RiAlertLine className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-red-900">
                        Delete Customer?
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete this customer? This action cannot be undone.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {customer.first_name?.[0]}{customer.last_name?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {customer.first_name} {customer.last_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-outline"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="btn bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <RiDeleteBin6Line className="w-4 h-4" />
                    )}
                    Delete Customer
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DeleteCustomerModal