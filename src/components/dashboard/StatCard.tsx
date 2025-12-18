import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-card border border-border p-6 transition-all hover:border-foreground/20",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
            {title}
          </p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              change.trend === 'up' && "text-success",
              change.trend === 'down' && "text-destructive",
              change.trend === 'neutral' && "text-muted-foreground"
            )}>
              <span>
                {change.trend === 'up' && '↑'}
                {change.trend === 'down' && '↓'}
                {change.trend === 'neutral' && '→'}
              </span>
              <span>{Math.abs(change.value)}% from last month</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-muted flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
