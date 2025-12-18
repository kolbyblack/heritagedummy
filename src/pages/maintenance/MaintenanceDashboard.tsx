import { Wrench, AlertTriangle, CheckCircle, Clock, Building2, Zap } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WorkOrderCard } from '@/components/dashboard/WorkOrderCard';
import { DeviceCard } from '@/components/dashboard/DeviceCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { mockWorkOrders, mockDevices, mockActivities } from '@/data/mockData';

export default function MaintenanceDashboard() {
  const pendingOrders = mockWorkOrders.filter(wo => wo.status === 'pending').length;
  const inProgressOrders = mockWorkOrders.filter(wo => wo.status === 'in-progress').length;
  const completedOrders = mockWorkOrders.filter(wo => wo.status === 'completed').length;
  const offlineDevices = mockDevices.filter(d => d.status === 'offline').length;

  return (
    <DashboardLayout title="Maintenance Dashboard" subtitle="Building operations overview">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={Clock}
          change={{ value: 2, trend: 'up' }}
        />
        <StatCard
          title="In Progress"
          value={inProgressOrders}
          icon={Wrench}
        />
        <StatCard
          title="Completed Today"
          value={completedOrders}
          icon={CheckCircle}
          change={{ value: 15, trend: 'up' }}
        />
        <StatCard
          title="Offline Devices"
          value={offlineDevices}
          icon={AlertTriangle}
          change={{ value: 1, trend: 'down' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Active Work Orders</h2>
              <span className="text-sm text-muted-foreground">
                {pendingOrders + inProgressOrders} active
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockWorkOrders
                .filter(wo => wo.status !== 'completed' && wo.status !== 'cancelled')
                .slice(0, 4)
                .map((order) => (
                  <WorkOrderCard key={order.id} workOrder={order} />
                ))}
            </div>
          </div>

          {/* Devices Needing Attention */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Devices Needing Attention</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDevices
                .filter(d => d.status === 'offline' || (d.batteryLevel && d.batteryLevel < 20))
                .map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Building Summary */}
          <div className="border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Building Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm">Tower A</span>
                </div>
                <span className="text-sm font-medium">80 units</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm">Tower B</span>
                </div>
                <span className="text-sm font-medium">60 units</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Devices</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Online</span>
                <span className="font-medium text-green-600">1,189 (95%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Offline</span>
                <span className="font-medium text-red-600">58 (5%)</span>
              </div>
            </div>
          </div>

          {/* Device Types Distribution */}
          <div className="border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Device Distribution</h3>
            <div className="space-y-3">
              {[
                { type: 'Thermostats', count: 280, icon: Zap },
                { type: 'Smart Lights', count: 420, icon: Zap },
                { type: 'Smart Locks', count: 140, icon: Zap },
                { type: 'Blinds', count: 280, icon: Zap },
                { type: 'Cameras', count: 127, icon: Zap },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <span className="text-sm">{item.type}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <ActivityFeed activities={mockActivities} maxItems={5} />
        </div>
      </div>
    </DashboardLayout>
  );
}
