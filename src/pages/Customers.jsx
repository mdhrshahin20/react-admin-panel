import PageHeader from '../components/PageHeader'

function Customers() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Customers" 
        description="Manage your customer database."
      />
      <div className="card">
        <p>Customers content will go here</p>
      </div>
    </div>
  )
}

export default Customers