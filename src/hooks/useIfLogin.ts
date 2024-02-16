import { getMe } from '@/api/auth/getMe';
import { useQuery } from '@tanstack/react-query';

function useIfLogin() {
  const { data: userData } = useQuery({ queryKey: ['getMe'], queryFn: getMe });

  return { userData };
}

export default useIfLogin;
