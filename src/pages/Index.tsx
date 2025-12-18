import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-foreground" />
      </div>
    </div>
  );
};

export default Index;
