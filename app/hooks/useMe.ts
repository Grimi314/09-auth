import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export const useMe = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const { data, isError } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);
};