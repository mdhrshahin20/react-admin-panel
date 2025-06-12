import PageHeader from '../components/PageHeader'

function Finance() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Finance" 
        description="Track your business finances and transactions."
      />
      <div className="card">
        <p>Finance content will go here</p>
      </div>
    </div>
  )
}

export default Finance