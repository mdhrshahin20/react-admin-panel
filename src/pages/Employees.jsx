import { useState } from 'react'
import { RiAddLine, RiEditLine, RiDeleteBin6Line } from 'react-icons/ri'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CrudForm from '../components/CrudForm'

const employeeFields = [
  { name: 'first_name', label: 'First Name', type: 'text', required: true },
  { name: 'last_name', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: false },
  { name: 'role', label: 'Role', type: 'text', required: true },
]

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'Manager'
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)

  const handleCreateEmployee = () => {
    setCurrentEmployee(null)
    setIsModalOpen(true)
  }

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee)
    setIsModalOpen(true)
  }

  const handleDeleteEmployee = (employee) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(e => e.id !== employee.id))
    }
  }

  const handleSubmit = (formData) => {
    if (currentEmployee) {
      // Update
      setEmployees(employees.map(emp =>
        emp.id === currentEmployee.id ? { ...emp, ...formData } : emp
      ))
    } else {
      // Create
      const newEmployee = {
        ...formData,
        id: Date.now() // Use timestamp as ID
      }
      setEmployees([newEmployee, ...employees])
    }
    setIsModalOpen(false)
  }

  const columns = [
    {
      Header: 'Name',
      accessor: row => `${row.first_name} ${row.last_name}`,
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditEmployee(row.original)}
            className="p-1 text-primary-600 hover:text-primary-900"
          >
            <RiEditLine className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteEmployee(row.original)}
            className="p-1 text-red-600 hover:text-red-900"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Employees" 
        description="Manage your staff and team members."
        actions={
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleCreateEmployee}
          >
            <RiAddLine className="w-5 h-5" />
            <span>New Employee</span>
          </button>
        }
      />

      <div className="card">
        <DataTable
          columns={columns}
          data={employees}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentEmployee ? 'Edit Employee' : 'Create Employee'}
      >
        <CrudForm
          fields={employeeFields}
          initialValues={currentEmployee || {}}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Employees