import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

const roleOptions: { role: UserRole; label: string; description: string }[] = [
  { role: 'admin', label: 'Administrator', description: 'Full system access and configuration' },
  { role: 'homeowner', label: 'Homeowner', description: 'Control your smart home devices' },
  { role: 'maintenance', label: 'Maintenance', description: 'Building operations and device management' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('homeowner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, selectedRole);
      navigate(`/${selectedRole}`);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-background flex items-center justify-center">
            <Home className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">SMART HOME</span>
        </div>
        
        <div className="max-w-md">
          <h1 className="swiss-heading-xl mb-6">
            Intelligent Living,<br />
            Simplified.
          </h1>
          <p className="text-lg text-background/70 leading-relaxed">
            A unified platform for building administrators, homeowners, 
            and maintenance teams to manage smart home systems with precision and ease.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-background/50">
          <Shield className="w-4 h-4" />
          <span>Enterprise-grade security • Real-time monitoring • 24/7 support</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-foreground flex items-center justify-center">
              <Home className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-semibold tracking-tight">SMART HOME</span>
          </div>

          <div className="mb-8">
            <h2 className="swiss-heading-lg mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Select your portal and sign in to continue</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-3 mb-8">
            {roleOptions.map((option) => (
              <button
                key={option.role}
                type="button"
                onClick={() => setSelectedRole(option.role)}
                className={`w-full p-4 text-left border-2 transition-all ${
                  selectedRole === option.role
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className={`text-sm ${
                      selectedRole === option.role ? 'text-background/70' : 'text-muted-foreground'
                    }`}>
                      {option.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${
                    selectedRole === option.role ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 border-2 border-border focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 border-2 border-border focus:border-foreground"
              />
            </div>

            <Button
              type="submit"
              variant="swiss"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            For demo purposes, any credentials will work.
          </p>
        </div>
      </div>
    </div>
  );
}
