import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HomeownerDashboard from "./pages/homeowner/HomeownerDashboard";
import MaintenanceDashboard from "./pages/maintenance/MaintenanceDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Homeowner Routes */}
      <Route
        path="/homeowner"
        element={
          <ProtectedRoute allowedRoles={['homeowner']}>
            <HomeownerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/homeowner/*"
        element={
          <ProtectedRoute allowedRoles={['homeowner']}>
            <HomeownerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Maintenance Routes */}
      <Route
        path="/maintenance"
        element={
          <ProtectedRoute allowedRoles={['maintenance']}>
            <MaintenanceDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/maintenance/*"
        element={
          <ProtectedRoute allowedRoles={['maintenance']}>
            <MaintenanceDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
