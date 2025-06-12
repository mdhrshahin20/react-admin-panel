import { useState, useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

function DataTable({ 
  columns, 
  data, 
  loading = false,
  pagination,
  onPageChange,
  onPageSizeChange,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  initialPageSize = 10 
}) {
  const [pageSize, setPageSize] = useState(initialPageSize)
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setTablePageSize,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize },
      manualPagination: !!pagination,
      pageCount: pagination?.totalPages || Math.ceil(data?.length / pageSize)
    },
    useSortBy,
    usePagination
  )
  
  const handlePageSizeChange = (e) => {
    const size = Number(e.target.value)
    setPageSize(size)
    setTablePageSize(size)
    if (onPageSizeChange) {
      onPageSizeChange(size)
    }
  }

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage + 1) // Convert to 1-based indexing
    } else {
      gotoPage(newPage)
    }
  }

  const handleSelectAll = (e) => {
    if (onSelectAll) {
      if (e.target.checked) {
        const allIds = data.map(row => row.id)
        onSelectAll(allIds)
      } else {
        onSelectAll([])
      }
    }
  }

  const isAllSelected = selectable && data.length > 0 && selectedRows.length === data.length
  const isIndeterminate = selectable && selectedRows.length > 0 && selectedRows.length < data.length

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="text-primary-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead className="table-header">
            {headerGroups.map((headerGroup, headerIndex) => (
              <tr key={headerIndex} {...headerGroup.getHeaderGroupProps()}>
                {selectable && (
                  <th className="table-header-cell w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isIndeterminate
                      }}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                )}
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    key={columnIndex}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="table-header-cell cursor-pointer hover:bg-primary-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      {column.render('Header')}
                      {column.canSort && (
                        <span className="ml-2">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <RiArrowDownSLine className="w-4 h-4" />
                            ) : (
                              <RiArrowUpSLine className="w-4 h-4" />
                            )
                          ) : (
                            <div className="w-4 h-4 opacity-30">
                              <RiArrowUpSLine className="w-4 h-4" />
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-body">
            {page.map((row, rowIndex) => {
              prepareRow(row)
              return (
                <motion.tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  className="table-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
                >
                  {selectable && (
                    <td className="table-cell">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.original.id)}
                        onChange={() => onRowSelect && onRowSelect(row.original.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} {...cell.getCellProps()} className="table-cell">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={!canPreviousPage}
            className="btn btn-outline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={!canNextPage}
            className="btn btn-outline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {pagination ? 
                  ((pagination.currentPage - 1) * pagination.perPage + 1) :
                  (page.length === 0 ? 0 : pageIndex * pageSize + 1)
                }
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {pagination ? 
                  Math.min(pagination.currentPage * pagination.perPage, pagination.total) :
                  Math.min((pageIndex + 1) * pageSize, data.length)
                }
              </span>{' '}
              of{' '}
              <span className="font-medium">
                {pagination ? pagination.total : data.length}
              </span>{' '}
              results
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="rounded border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {[5, 10, 20, 50].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
            
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={!canPreviousPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              
              {[...Array(Math.min(5, pageCount)).keys()].map(i => {
                const pageNum = i + Math.max(0, Math.min(pageCount - 5, pageIndex - 2))
                const isCurrentPage = pagination ? 
                  (pageNum + 1 === pagination.currentPage) : 
                  (pageNum === pageIndex)
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      isCurrentPage
                        ? 'bg-primary-50 text-primary-600 z-10 ring-1 ring-inset ring-primary-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                )
              })}
              
              <button
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={!canNextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable