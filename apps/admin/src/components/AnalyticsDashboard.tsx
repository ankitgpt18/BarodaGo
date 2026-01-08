import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GlassCard } from './UIComponents';
import styled from 'styled-components';
import { colors } from '../styles/design-tokens';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
`;

const StatCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${colors.primary[700]};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${colors.neutral[600]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChartCard = styled(GlassCard)`
  grid-column: span 2;
  min-height: 400px;
`;

const COLORS = [colors.primary[500], colors.success[500], colors.warning[500], colors.error[500]];

export const AnalyticsDashboard: React.FC = () => {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/analytics/dashboard');
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading analytics...</div>;
    if (!analytics) return <div>No data available</div>;

    return (
        <DashboardGrid>
            <StatCard>
                <StatLabel>Total Incidents</StatLabel>
                <StatValue>{analytics.stats.total_incidents}</StatValue>
            </StatCard>

            <StatCard>
                <StatLabel>Pending</StatLabel>
                <StatValue>{analytics.stats.pending_incidents}</StatValue>
            </StatCard>

            <StatCard>
                <StatLabel>Completed Today</StatLabel>
                <StatValue>{analytics.stats.completed_today}</StatValue>
            </StatCard>

            <StatCard>
                <StatLabel>Active Workers</StatLabel>
                <StatValue>{analytics.stats.active_workers}</StatValue>
            </StatCard>

            <ChartCard>
                <h3>Incident Trends (30 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke={colors.primary[500]} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
                <h3>Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={analytics.categories}
                            dataKey="count"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {analytics.categories.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
                <h3>Ward Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.ward_performance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ward" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill={colors.primary[500]} />
                        <Bar dataKey="completed" fill={colors.success[500]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </DashboardGrid>
    );
};
