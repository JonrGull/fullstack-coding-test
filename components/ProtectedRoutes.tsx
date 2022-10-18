import LoadingSpinner from 'components/LoadingSpinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return children;
};

export default ProtectedRoute;
