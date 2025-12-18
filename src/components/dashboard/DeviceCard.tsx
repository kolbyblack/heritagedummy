import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Thermometer, 
  Lightbulb, 
  Lock, 
  Blinds, 
  Camera, 
  Radio,
  Wifi,
  WifiOff,
  Battery,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import type { Device, DeviceType } from '@/types';

const deviceIcons: Record<DeviceType, React.ComponentType<{ className?: string }>> = {
  thermostat: Thermometer,
  light: Lightbulb,
  lock: Lock,
  blinds: Blinds,
  camera: Camera,
  sensor: Radio,
  doorbell: Radio,
};

interface DeviceCardProps {
  device: Device;
  compact?: boolean;
  onControl?: (deviceId: string, value: number | boolean) => void;
}

export function DeviceCard({ device, compact = false, onControl }: DeviceCardProps) {
  const [value, setValue] = useState(
    typeof device.currentValue === 'number' ? device.currentValue : 50
  );
  const [isOn, setIsOn] = useState(
    typeof device.currentValue === 'boolean' ? device.currentValue : true
  );

  const Icon = deviceIcons[device.type];
  const isOnline = device.status === 'online';

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
    onControl?.(device.id, newValue[0]);
  };

  const handleToggle = () => {
    setIsOn(!isOn);
    onControl?.(device.id, !isOn);
  };

  if (compact) {
    return (
      <div className={cn(
        "flex items-center justify-between p-4 border border-border bg-card transition-all hover:border-foreground/20",
        !isOnline && "opacity-60"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 flex items-center justify-center",
            isOnline ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-sm">{device.name}</p>
            <p className="text-xs text-muted-foreground">{device.room}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {device.type === 'lock' ? (
            <span className={cn(
              "text-xs font-medium uppercase tracking-wide",
              isOn ? "text-success" : "text-muted-foreground"
            )}>
              {isOn ? 'Locked' : 'Unlocked'}
            </span>
          ) : (
            <span className="text-sm font-medium">
              {device.type === 'thermostat' ? `${value}°C` : `${value}%`}
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "border border-border bg-card p-6 transition-all hover:border-foreground/20",
      !isOnline && "opacity-60"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 flex items-center justify-center",
            isOnline ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
          )}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium">{device.name}</h3>
            <p className="text-sm text-muted-foreground">{device.room}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-success" />
          ) : (
            <WifiOff className="w-4 h-4 text-destructive" />
          )}
          {device.batteryLevel !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Battery className="w-4 h-4" />
              <span>{device.batteryLevel}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {device.type === 'thermostat' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temperature</span>
              <span className="text-2xl font-semibold">{value}°C</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              min={16}
              max={30}
              step={0.5}
              disabled={!isOnline}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>16°C</span>
              <span>30°C</span>
            </div>
          </div>
        )}

        {device.type === 'light' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Brightness</span>
              <span className="text-2xl font-semibold">{value}%</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              min={0}
              max={100}
              step={1}
              disabled={!isOnline}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <Switch
                checked={isOn}
                onCheckedChange={handleToggle}
                disabled={!isOnline}
              />
              <span className="text-sm">{isOn ? 'On' : 'Off'}</span>
            </div>
          </div>
        )}

        {device.type === 'lock' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={cn(
                "text-lg font-semibold uppercase tracking-wide",
                isOn ? "text-success" : "text-warning"
              )}>
                {isOn ? 'Locked' : 'Unlocked'}
              </span>
            </div>
            <Button
              variant={isOn ? "outline" : "default"}
              className="w-full"
              onClick={handleToggle}
              disabled={!isOnline}
            >
              {isOn ? 'Unlock' : 'Lock'}
            </Button>
          </div>
        )}

        {device.type === 'blinds' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Position</span>
              <span className="text-2xl font-semibold">{value}%</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              min={0}
              max={100}
              step={5}
              disabled={!isOnline}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Closed</span>
              <span>Open</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Last active: {new Date(device.lastActive).toLocaleTimeString()}
        </span>
        <Button variant="ghost" size="sm">
          Settings
        </Button>
      </div>
    </div>
  );
}
