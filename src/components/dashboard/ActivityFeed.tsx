import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  AlertCircle,
  Clock,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  device?: string;
  apartment?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

const typeIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const typeStyles = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-destructive',
  info: 'text-muted-foreground',
};

export function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className="border border-border bg-card">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {displayedActivities.map((activity) => {
          const Icon = typeIcons[activity.type];
          return (
            <div key={activity.id} className="px-6 py-4 flex items-start gap-4">
              <div className={cn("mt-0.5", typeStyles[activity.type])}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{activity.message}</p>
                {(activity.device || activity.apartment) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {[activity.device, activity.apartment].filter(Boolean).join(' • ')}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                <Clock className="w-3 h-3" />
                <span>{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
      {activities.length > maxItems && (
        <div className="px-6 py-3 border-t border-border">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all {activities.length} activities →
          </button>
        </div>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}
