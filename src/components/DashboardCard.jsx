import { motion } from 'framer-motion'

function DashboardCard({ title, value, icon, change, changeType = 'positive', onClick }) {
  return (
    <motion.div 
      className="card cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-primary-900">{value}</h3>
        </div>
        <div className="p-2 bg-primary-50 rounded-lg">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4">
          <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </span>
          <span className="ml-1 text-xs text-primary-500">vs last month</span>
        </div>
      )}
    </motion.div>
  )
}

export default DashboardCard