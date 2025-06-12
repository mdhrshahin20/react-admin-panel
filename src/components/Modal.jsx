import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine } from 'react-icons/ri'

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const modalRef = useRef(null)
  
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])
  
  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }
  
  // Get width based on size prop
  const getWidth = () => {
    switch (size) {
      case 'sm': return 'max-w-md'
      case 'md': return 'max-w-lg'
      case 'lg': return 'max-w-2xl'
      case 'xl': return 'max-w-4xl'
      case 'full': return 'max-w-full mx-4'
      default: return 'max-w-lg'
    }
  }

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
            onClick={onClose}
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                className={`bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${getWidth()}`}
                ref={modalRef}
                onClick={handleModalClick}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <RiCloseLine className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="px-6 py-4">
                  {children}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal