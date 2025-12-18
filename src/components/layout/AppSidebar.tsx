import { useLocation, Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Settings,
  BarChart3,
  Home,
  Bell,
  User,
  Phone,
  Wrench,
  Clipboard,
  MapPin,
  Activity,
  LogOut,
  ChevronRight,
  Zap,
  Shield,
  Thermometer,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigationByRole: Record<UserRole, NavGroup[]> = {
  admin: [
    {
      title: 'Overview',
      items: [
        { title: 'Dashboard', href: '/admin', icon: BarChart3 },
      ],
    },
    {
      title: 'Building Management',
      items: [
        { title: 'Apartments', href: '/admin/apartments', icon: Building2 },
        { title: 'Floor Plans', href: '/admin/floors', icon: MapPin },
      ],
    },
    {
      title: 'Residents',
      items: [
        { title: 'Homeowners', href: '/admin/homeowners', icon: Users },
        { title: 'Assignments', href: '/admin/assignments', icon: Clipboard },
      ],
    },
    {
      title: 'System',
      items: [
        { title: 'Device Types', href: '/admin/devices', icon: Thermometer },
        { title: 'Configuration', href: '/admin/config', icon: Settings },
        { title: 'Reports', href: '/admin/reports', icon: BarChart3 },
      ],
    },
  ],
  homeowner: [
    {
      title: 'Overview',
      items: [
        { title: 'Dashboard', href: '/homeowner', icon: Home },
      ],
    },
    {
      title: 'My Apartment',
      items: [
        { title: 'Devices', href: '/homeowner/devices', icon: Zap },
        { title: 'Energy', href: '/homeowner/energy', icon: Activity },
        { title: 'Security', href: '/homeowner/security', icon: Shield },
      ],
    },
    {
      title: 'Account',
      items: [
        { title: 'Notifications', href: '/homeowner/notifications', icon: Bell, badge: 3 },
        { title: 'Profile', href: '/homeowner/profile', icon: User },
        { title: 'Support', href: '/homeowner/support', icon: Phone },
      ],
    },
  ],
  maintenance: [
    {
      title: 'Overview',
      items: [
        { title: 'Dashboard', href: '/maintenance', icon: Activity },
      ],
    },
    {
      title: 'Building',
      items: [
        { title: 'Floor Map', href: '/maintenance/floors', icon: MapPin },
        { title: 'Device Locations', href: '/maintenance/locations', icon: Building2 },
      ],
    },
    {
      title: 'Operations',
      items: [
        { title: 'Device Inventory', href: '/maintenance/inventory', icon: Wrench },
        { title: 'Work Orders', href: '/maintenance/orders', icon: Clipboard, badge: 5 },
        { title: 'Device History', href: '/maintenance/history', icon: BarChart3 },
      ],
    },
  ],
};

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  const navGroups = navigationByRole[user.role];
  const isActive = (href: string) => location.pathname === href;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-foreground flex items-center justify-center">
            <Home className="w-4 h-4 text-sidebar" />
          </div>
          <span className="font-semibold tracking-tight">SMART HOME</span>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-sidebar-border">
        <p className="text-xs uppercase tracking-wider text-sidebar-foreground/60 mb-1">
          {user.role} Portal
        </p>
        <p className="font-medium truncate">{user.name}</p>
        <p className="text-sm text-sidebar-foreground/60 truncate">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="px-6 mb-2 text-xs uppercase tracking-wider text-sidebar-foreground/40">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-6 py-2.5 text-sm transition-colors relative",
                      isActive(item.href)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    {isActive(item.href) && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sidebar-foreground" />
                    )}
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="bg-sidebar-foreground text-sidebar px-1.5 py-0.5 text-xs font-medium">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={cn(
                      "w-4 h-4 opacity-0 transition-opacity",
                      isActive(item.href) && "opacity-100"
                    )} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-2 py-2.5 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
