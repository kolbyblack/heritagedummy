import { cn } from '@/lib/utils';
import { Building2, User, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Apartment } from '@/types';

interface ApartmentCardProps {
  apartment: Apartment;
  onAssign?: () => void;
  onView?: () => void;
}

const statusStyles = {
  occupied: { bg: 'bg-success/10', text: 'text-success', label: 'Occupied' },
  vacant: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Vacant' },
  maintenance: { bg: 'bg-warning/10', text: 'text-warning', label: 'Maintenance' },
};

export function ApartmentCard({ apartment, onAssign, onView }: ApartmentCardProps) {
  const status = statusStyles[apartment.status];

  return (
    <div className="border border-border bg-card p-6 transition-all hover:border-foreground/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Apt {apartment.unit}</h3>
            <p className="text-sm text-muted-foreground">Floor {apartment.floor} • {apartment.type}</p>
          </div>
        </div>
        <span className={cn(
          "px-2 py-1 text-xs font-medium uppercase tracking-wide",
          status.bg,
          status.text
        )}>
          {status.label}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className={apartment.homeownerName ? '' : 'text-muted-foreground'}>
            {apartment.homeownerName || 'No owner assigned'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-muted-foreground" />
          <span>{apartment.deviceCount} devices connected</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        {apartment.status === 'vacant' && onAssign && (
          <Button variant="swiss" size="sm" onClick={onAssign} className="flex-1">
            Assign Owner
          </Button>
        )}
        <Button variant="swiss-outline" size="sm" onClick={onView} className="flex-1">
          View Details
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
