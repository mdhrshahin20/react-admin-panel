import { useState, useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'

function DataTable({ columns, data, initialPageSize = 10 }) {
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
    },
    useSortBy,
    usePagination
  )
  
  const handlePageSizeChange = (e) => {
    const size = Number(e.target.value)
    setPageSize(size)
    setTablePageSize(size)
  }

  return (
    <div className="card overflow-hidden">
      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead className="table-header">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="table-header-cell"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-body">
            {page.map(row => {
              prepareRow(row)
              return (
                <tr key={row.id} {...row.getRowProps()} className="table-row">
                  {row.cells.map(cell => (
                    <td key={cell.id} {...cell.getCellProps()} className="table-cell">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="btn btn-outline text-sm"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="btn btn-outline text-sm"
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{page.length === 0 ? 0 : pageIndex * pageSize + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min((pageIndex + 1) * pageSize, data.length)}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          
          <div className="flex items-center">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="mr-4 rounded border-gray-300 text-sm"
            >
              {[5, 10, 20, 50].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
            
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                ←
              </button>
              
              {[...Array(Math.min(5, pageCount)).keys()].map(i => {
                const pageNum = i + Math.max(0, Math.min(pageCount - 5, pageIndex - 2))
                return (
                  <button
                    key={pageNum}
                    onClick={() => gotoPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      pageNum === pageIndex
                        ? 'bg-primary-50 text-primary-600 z-10'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                )
              })}
              
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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