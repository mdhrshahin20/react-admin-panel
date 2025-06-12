import PageHeader from '../components/PageHeader'

function Settings() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Settings" 
        description="Configure your application settings."
      />
      <div className="card">
        <p>Settings content will go here</p>
      </div>
    </div>
  )
}

export default Settings