import { useState } from 'react';
import { Thermometer, Lightbulb, Lock, Blinds, Camera, Radio, Battery, Wifi } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { DeviceCard } from '@/components/dashboard/DeviceCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { mockDevices, mockActivities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import type { DeviceType } from '@/types';

const rooms = ['All Rooms', 'Living Room', 'Master Bedroom', 'Kitchen', 'Entrance', 'Hallway'];

const deviceTypeFilters: { type: DeviceType | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: 'all', label: 'All', icon: Radio },
  { type: 'thermostat', label: 'Climate', icon: Thermometer },
  { type: 'light', label: 'Lighting', icon: Lightbulb },
  { type: 'lock', label: 'Security', icon: Lock },
  { type: 'blinds', label: 'Blinds', icon: Blinds },
  { type: 'camera', label: 'Camera', icon: Camera },
];

export default function HomeownerDashboard() {
  const [selectedRoom, setSelectedRoom] = useState('All Rooms');
  const [selectedType, setSelectedType] = useState<DeviceType | 'all'>('all');

  const filteredDevices = mockDevices.filter((device) => {
    const roomMatch = selectedRoom === 'All Rooms' || device.room === selectedRoom;
    const typeMatch = selectedType === 'all' || device.type === selectedType;
    return roomMatch && typeMatch;
  });

  const onlineDevices = mockDevices.filter(d => d.status === 'online').length;
  const lowBatteryDevices = mockDevices.filter(d => d.batteryLevel && d.batteryLevel < 20).length;

  return (
    <DashboardLayout title="My Home" subtitle="Apartment 101 • Tower A">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Devices"
          value={mockDevices.length}
          icon={Radio}
        />
        <StatCard
          title="Online"
          value={onlineDevices}
          icon={Wifi}
          change={{ value: 0, trend: 'neutral' }}
        />
        <StatCard
          title="Low Battery"
          value={lowBatteryDevices}
          icon={Battery}
          change={{ value: 1, trend: 'up' }}
        />
        <StatCard
          title="Temperature"
          value="22°C"
          icon={Thermometer}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="space-y-4">
            {/* Room Filter */}
            <div className="flex flex-wrap gap-2">
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all border-2",
                    selectedRoom === room
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-foreground border-border hover:border-foreground/50"
                  )}
                >
                  {room}
                </button>
              ))}
            </div>

            {/* Device Type Filter */}
            <div className="flex flex-wrap gap-2">
              {deviceTypeFilters.map((filter) => (
                <button
                  key={filter.type}
                  onClick={() => setSelectedType(filter.type)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm transition-all border",
                    selectedType === filter.type
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/50"
                  )}
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>

          {filteredDevices.length === 0 && (
            <div className="border border-border bg-card p-12 text-center">
              <Radio className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No devices found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters to see more devices.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Controls */}
          <div className="border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Quick Controls</h3>
            <div className="space-y-3">
              {mockDevices.slice(0, 4).map((device) => (
                <DeviceCard key={device.id} device={device} compact />
              ))}
            </div>
          </div>

          {/* Activity */}
          <ActivityFeed 
            activities={mockActivities.filter(a => a.apartment === 'Apt 101')} 
            maxItems={5} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
