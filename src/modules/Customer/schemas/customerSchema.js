// Customer form field definitions - centralized schema for reusability
export const customerFormFields = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name',
    validation: {
      minLength: 2,
      maxLength: 50
    }
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name',
    validation: {
      minLength: 2,
      maxLength: 50
    }
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter email address',
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    required: false,
    placeholder: 'Enter phone number',
    validation: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/
    }
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    required: false,
    placeholder: 'Enter address',
    rows: 3
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
    required: false,
    placeholder: 'Additional notes',
    rows: 4
  }
]

// Table column definitions
export const customerTableColumns = [
  {
    Header: 'First Name',
    accessor: 'first_name',
    sortable: true
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    sortable: true
  },
  {
    Header: 'Email',
    accessor: 'email',
    sortable: true
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    sortable: false
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sortable: false
  }
]

// Search/filter field definitions
export const customerSearchFields = [
  {
    name: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Search customers...'
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: '', label: 'All Status' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  }
]