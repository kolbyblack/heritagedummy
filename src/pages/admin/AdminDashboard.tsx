import { Building2, Users, Zap, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ApartmentCard } from '@/components/dashboard/ApartmentCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { mockApartments, mockActivities, mockBuildings } from '@/data/mockData';

export default function AdminDashboard() {
  const totalApartments = mockBuildings.reduce((acc, b) => acc + b.totalApartments, 0);
  const occupiedApartments = mockBuildings.reduce((acc, b) => acc + b.occupiedApartments, 0);
  const occupancyRate = Math.round((occupiedApartments / totalApartments) * 100);

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Building overview and management">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Apartments"
          value={totalApartments}
          icon={Building2}
          change={{ value: 5, trend: 'up' }}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={TrendingUp}
          change={{ value: 2.5, trend: 'up' }}
        />
        <StatCard
          title="Active Devices"
          value="1,247"
          icon={Zap}
          change={{ value: 12, trend: 'up' }}
        />
        <StatCard
          title="Open Alerts"
          value="8"
          icon={AlertTriangle}
          change={{ value: 3, trend: 'down' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buildings Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Buildings Overview</h2>
              <span className="text-sm text-muted-foreground">{mockBuildings.length} buildings</span>
            </div>
            <div className="space-y-4">
              {mockBuildings.map((building) => (
                <div 
                  key={building.id} 
                  className="flex items-center justify-between p-4 border border-border hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center font-semibold">
                      {building.name.slice(-1)}
                    </div>
                    <div>
                      <h3 className="font-medium">{building.name}</h3>
                      <p className="text-sm text-muted-foreground">{building.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">{building.floors}</p>
                      <p className="text-muted-foreground">Floors</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{building.occupiedApartments}/{building.totalApartments}</p>
                      <p className="text-muted-foreground">Occupied</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{Math.round((building.occupiedApartments / building.totalApartments) * 100)}%</p>
                      <p className="text-muted-foreground">Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Apartments */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recent Apartments</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockApartments.slice(0, 4).map((apt) => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Homeowners</span>
                </div>
                <span className="font-semibold">126</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Online Devices</span>
                </div>
                <span className="font-semibold">1,189</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Pending Work Orders</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <ActivityFeed activities={mockActivities} maxItems={5} />
        </div>
      </div>
    </DashboardLayout>
  );
}
