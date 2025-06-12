function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-primary-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-primary-500">{description}</p>}
      </div>
      
      {actions && (
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader