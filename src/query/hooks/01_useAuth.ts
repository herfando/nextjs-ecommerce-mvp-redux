import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  loginBuyer,
  registerBuyer,
  getProfile,
} from '@/query/services/01_authService';
import { LoginType, RegisterType, User } from '@/query/types/01_authType';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // get user profile
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['authUser'],
    queryFn: getProfile,
    retry: false,
  });

  // login
  const loginMutation = useMutation({
    mutationFn: (data: LoginType) => loginBuyer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  // register
  const registerMutation = useMutation({
    mutationFn: (data: RegisterType) => registerBuyer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  return {
    user,
    isLoading,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
