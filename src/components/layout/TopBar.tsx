import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-muted px-3 py-1.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="border-0 bg-transparent h-7 w-48 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
          />
          <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-medium text-sm">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </header>
  );
}
