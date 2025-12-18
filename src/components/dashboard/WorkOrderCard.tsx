import { cn } from '@/lib/utils';
import { 
  Wrench, 
  ArrowUpRight, 
  Clock,
  User,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WorkOrder } from '@/types';

interface WorkOrderCardProps {
  workOrder: WorkOrder;
  onStart?: () => void;
  onComplete?: () => void;
  onView?: () => void;
}

const priorityStyles = {
  low: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Low' },
  medium: { bg: 'bg-foreground/10', text: 'text-foreground', label: 'Medium' },
  high: { bg: 'bg-warning/10', text: 'text-warning', label: 'High' },
  urgent: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Urgent' },
};

const statusStyles = {
  pending: { bg: 'bg-muted', text: 'text-muted-foreground' },
  'in-progress': { bg: 'bg-foreground', text: 'text-background' },
  completed: { bg: 'bg-success/10', text: 'text-success' },
  cancelled: { bg: 'bg-destructive/10', text: 'text-destructive' },
};

const typeLabels = {
  repair: 'Repair',
  maintenance: 'Maintenance',
  installation: 'Installation',
  move: 'Device Move',
};

export function WorkOrderCard({ workOrder, onStart, onComplete, onView }: WorkOrderCardProps) {
  const priority = priorityStyles[workOrder.priority];
  const status = statusStyles[workOrder.status];

  return (
    <div className="border border-border bg-card p-5 transition-all hover:border-foreground/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">#{workOrder.id}</span>
              <span className={cn(
                "px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                status.bg,
                status.text
              )}>
                {workOrder.status}
              </span>
            </div>
            <h3 className="font-medium">{typeLabels[workOrder.type]}</h3>
          </div>
        </div>
        <span className={cn(
          "px-2 py-1 text-xs font-medium uppercase tracking-wide",
          priority.bg,
          priority.text
        )}>
          {priority.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {workOrder.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Building2 className="w-3 h-3" />
          <span>Apt {workOrder.apartmentId}</span>
        </div>
        {workOrder.assignedTo && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{workOrder.assignedTo}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{new Date(workOrder.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        {workOrder.status === 'pending' && onStart && (
          <Button variant="swiss" size="sm" onClick={onStart} className="flex-1">
            Start Work
          </Button>
        )}
        {workOrder.status === 'in-progress' && onComplete && (
          <Button variant="success" size="sm" onClick={onComplete} className="flex-1">
            Complete
          </Button>
        )}
        <Button variant="swiss-ghost" size="sm" onClick={onView}>
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
