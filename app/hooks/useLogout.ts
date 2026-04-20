import { useAuthStore } from '@/lib/store/authStore';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


const logoutRequest = async () => {
  await axios.post('/api/auth/logout', {}, { withCredentials: true });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      logout();
      queryClient.removeQueries({ queryKey: ['me'] });
    },
  });
};