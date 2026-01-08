import { useEffect, useState } from 'react'
import DigitalTwin from '../components/DigitalTwin'
import IncidentDashboard from '../components/IncidentDashboard'
import StatsCards from '../components/StatsCards'
import './Dashboard.css'

interface DashboardStats {
    total_incidents: number
    pending: number
    in_progress: number
    completed: number
    active_workers: number
}

function Dashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        total_incidents: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,
        active_workers: 0
    })

    useEffect(() => {
        // Fetch dashboard stats
        // TODO: Replace with actual API call
        setStats({
            total_incidents: 1247,
            pending: 42,
            in_progress: 18,
            completed: 1187,
            active_workers: 156
        })
    }, [])

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <div>
                        <h1>🏛️ BarodaGo - City Brain</h1>
                        <p className="subtitle">AI-Powered Municipal Infrastructure Dashboard</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-primary">
                            <span>📊</span> Generate Report
                        </button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <StatsCards stats={stats} />

                <div className="dashboard-grid">
                    <section className="map-section">
                        <div className="section-header">
                            <h2>3D Digital Twin - Vadodara</h2>
                            <p>Real-time incident visualization across 19 wards</p>
                        </div>
                        <DigitalTwin />
                    </section>

                    <section className="incidents-section">
                        <IncidentDashboard />
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
