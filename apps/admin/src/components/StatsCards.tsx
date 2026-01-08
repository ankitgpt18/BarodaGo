import './StatsCards.css'

interface StatsCardsProps {
    stats: {
        total_incidents: number
        pending: number
        in_progress: number
        completed: number
        active_workers: number
    }
}

function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            title: 'Total Incidents',
            value: stats.total_incidents.toLocaleString(),
            icon: '📋',
            color: 'primary',
            trend: '+12% from last month'
        },
        {
            title: 'Pending',
            value: stats.pending,
            icon: '⏳',
            color: 'warning',
            trend: '-8% from yesterday'
        },
        {
            title: 'In Progress',
            value: stats.in_progress,
            icon: '🔧',
            color: 'info',
            trend: '6 assigned today'
        },
        {
            title: 'Completed',
            value: stats.completed.toLocaleString(),
            icon: '✅',
            color: 'success',
            trend: `${((stats.completed / stats.total_incidents) * 100).toFixed(1)}% resolution rate`
        },
        {
            title: 'Active Workers',
            value: stats.active_workers,
            icon: '👷',
            color: 'secondary',
            trend: '12 online now'
        }
    ]

    return (
        <div className="stats-grid">
            {cards.map((card, index) => (
                <div key={index} className={`stat-card stat-card-${card.color} fade-in`}>
                    <div className="stat-icon">{card.icon}</div>
                    <div className="stat-content">
                        <p className="stat-label">{card.title}</p>
                        <h3 className="stat-value">{card.value}</h3>
                        <p className="stat-trend">{card.trend}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatsCards
