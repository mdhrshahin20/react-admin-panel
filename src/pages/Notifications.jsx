import PageHeader from '../components/PageHeader'

function Notifications() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Notifications" 
        description="Manage your notification settings and history."
      />
      <div className="card">
        <p>Notifications content will go here</p>
      </div>
    </div>
  )
}

export default Notifications