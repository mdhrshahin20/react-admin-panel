import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { 
  RiCalendarLine, RiUserLine, RiMapPinLine, 
  RiMoneyDollarCircleLine, RiTeamLine, RiServiceLine
} from 'react-icons/ri'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)
import { Line, Bar } from 'react-chartjs-2'

import PageHeader from '../components/PageHeader'

// Register ChartJS components

function Dashboard() {
  const [period, setPeriod] = useState('month')
  
  // Sample data for dashboard cards
  const dashboardCards = [
    {
      title: 'Total Appointments',
      value: '243',
      change: '12%',
      changeType: 'positive',
      icon: <RiCalendarLine className="w-6 h-6 text-primary-600" />,
      path: '/calendar'
    },
    {
      title: 'Active Customers',
      value: '1,432',
      change: '8%',
      changeType: 'positive',
      icon: <RiUserLine className="w-6 h-6 text-primary-600" />,
      path: '/customers'
    },
    {
      title: 'Locations',
      value: '5',
      change: '1',
      changeType: 'positive',
      icon: <RiMapPinLine className="w-6 h-6 text-primary-600" />,
      path: '/locations'
    },
    {
      title: 'Revenue',
      value: '$24,500',
      change: '5%',
      changeType: 'negative',
      icon: <RiMoneyDollarCircleLine className="w-6 h-6 text-primary-600" />,
      path: '/finance'
    }
  ]
  
  // Sample data for appointments chart
  const appointmentsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Appointments',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 85, 90],
        fill: true,
        backgroundColor: 'rgba(75, 85, 99, 0.1)',
        borderColor: 'rgba(75, 85, 99, 0.8)',
        tension: 0.4,
      }
    ]
  }
  
  // Sample data for revenue chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 15000, 18000, 16500, 21000, 22500, 19000, 21500, 24000, 28000, 25000, 24500],
        backgroundColor: 'rgba(31, 41, 55, 0.8)',
        borderRadius: 4,
      }
    ]
  }
  
  // Sample data for recent activities
  const recentActivities = [
    { id: 1, type: 'appointment', message: 'New appointment: John Doe - Haircut', time: '10 minutes ago' },
    { id: 2, type: 'customer', message: 'New customer registered: Sarah Smith', time: '1 hour ago' },
    { id: 3, type: 'payment', message: 'Payment received: $150 - Deluxe Spa Package', time: '3 hours ago' },
    { id: 4, type: 'employee', message: 'Staff schedule updated for next week', time: '5 hours ago' },
    { id: 5, type: 'service', message: 'New service added: Aromatherapy Massage', time: '1 day ago' }
  ]
  
  // Sample data for upcoming appointments
  const upcomingAppointments = [
    { id: 1, customer: 'John Doe', service: 'Haircut', date: 'Today, 2:00 PM', status: 'confirmed' },
    { id: 2, customer: 'Jane Smith', service: 'Manicure', date: 'Today, 3:30 PM', status: 'confirmed' },
    { id: 3, customer: 'Robert Johnson', service: 'Massage', date: 'Tomorrow, 10:00 AM', status: 'pending' },
    { id: 4, customer: 'Emily Davis', service: 'Facial', date: 'Tomorrow, 1:15 PM', status: 'confirmed' }
  ]
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 4,
        padding: 10
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        },
        ticks: {
          precision: 0
        }
      }
    }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your business performance and activity."
      />
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {dashboardCards.map((card, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-md transition-shadow duration-300"
            onClick={() => console.log(`Navigate to ${card.path}`)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.change && (
                <p className="text-xs text-muted-foreground">
                  <span className={card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                    {card.changeType === 'positive' ? '↑' : '↓'} {card.change}
                  </span>
                  {' '}vs last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Appointments Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Appointments</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant={period === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod('week')}
              >
                Week
              </Button>
              <Button 
                variant={period === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod('month')}
              >
                Month
              </Button>
              <Button 
                variant={period === 'year' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod('year')}
              >
                Year
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={appointmentsData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Revenue</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant={period === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod('week')}
              >
                Week
              </Button>
              <Button 
                variant={period === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod('month')}
              >
                Month
              </Button>
              <Button 
                variant={period === 'year' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod('year')}
              >
                Year
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={revenueData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-muted rounded-full p-2 mt-1">
                    {activity.type === 'appointment' && <RiCalendarLine className="w-5 h-5" />}
                    {activity.type === 'customer' && <RiUserLine className="w-5 h-5" />}
                    {activity.type === 'payment' && <RiMoneyDollarCircleLine className="w-5 h-5" />}
                    {activity.type === 'employee' && <RiTeamLine className="w-5 h-5" />}
                    {activity.type === 'service' && <RiServiceLine className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 p-0 h-auto">
              View all activity
            </Button>
          </CardContent>
        </Card>
        
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between">
                    <span className="font-medium">{appointment.customer}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-muted-foreground">{appointment.service}</span>
                    <span className="text-sm text-muted-foreground">{appointment.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 p-0 h-auto">
              View all appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard