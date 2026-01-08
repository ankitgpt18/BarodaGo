import { useState, useEffect } from 'react'
import './IncidentDashboard.css'

interface Incident {
    id: number
    category: string
    severity: number
    description: string
    ward_name: string
    status: string
    created_at: string
}

function IncidentDashboard() {
    const [incidents, setIncidents] = useState<Incident[]>([])
    const [filter, setFilter] = useState<string>('all')

    useEffect(() => {
        // Sample data (replace with API call)
        const sampleIncidents: Incident[] = [
            {
                id: 1,
                category: 'pothole',
                severity: 8,
                description: 'Large pothole on main road',
                ward_name: 'Alkapuri',
                status: 'pending',
                created_at: '2026-01-08T10:30:00'
            },
            {
                id: 2,
                category: 'garbage',
                severity: 5,
                description: 'Garbage accumulation near park',
                ward_name: 'Akota',
                status: 'in_progress',
                created_at: '2026-01-08T09:15:00'
            },
            {
                id: 3,
                category: 'streetlight',
                severity: 3,
                description: 'Streetlight not working',
                ward_name: 'Gotri',
                status: 'pending',
                created_at: '2026-01-08T08:45:00'
            }
        ]
        setIncidents(sampleIncidents)
    }, [])

    const filteredIncidents = filter === 'all'
        ? incidents
        : incidents.filter(inc => inc.status === filter)

    const getCategoryIcon = (category: string): string => {
        const icons: Record<string, string> = {
            pothole: '🕳️',
            garbage: '🗑️',
            streetlight: '💡',
            stray_cattle: '🐄',
            sewer: '🚰'
        }
        return icons[category] || '📍'
    }

    const getStatusColor = (status: string): string => {
        const colors: Record<string, string> = {
            pending: 'warning',
            in_progress: 'info',
            completed: 'success',
            verified: 'success'
        }
        return colors[status] || 'default'
    }

    return (
        <div className="incident-dashboard">
            <div className="dashboard-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </button>
                <button
                    className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
                    onClick={() => setFilter('in_progress')}
                >
                    In Progress
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>

            <div className="incidents-list">
                {filteredIncidents.map(incident => (
                    <div key={incident.id} className="incident-item fade-in">
                        <div className="incident-header">
                            <span className="incident-icon">{getCategoryIcon(incident.category)}</span>
                            <div className="incident-info">
                                <h4>{incident.category.replace('_', ' ').toUpperCase()}</h4>
                                <p className="incident-ward">📍 {incident.ward_name}</p>
                            </div>
                            <span className={`status-badge status-${getStatusColor(incident.status)}`}>
                                {incident.status.replace('_', ' ')}
                            </span>
                        </div>

                        <p className="incident-description">{incident.description}</p>

                        <div className="incident-footer">
                            <div className="severity-bar">
                                <div
                                    className={`severity-fill severity-${incident.severity >= 7 ? 'high' : incident.severity >= 4 ? 'medium' : 'low'}`}
                                    style={{ width: `${incident.severity * 10}%` }}
                                />
                            </div>
                            <span className="incident-time">
                                {new Date(incident.created_at).toLocaleTimeString('en-IN', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>

                        <div className="incident-actions">
                            <button className="btn-action">Assign Worker</button>
                            <button className="btn-action">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IncidentDashboard
