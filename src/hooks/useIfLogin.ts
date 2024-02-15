import { getMe } from '@/api/auth/getMe';
import { useQuery } from '@tanstack/react-query';

function useIfLogin() {
  const result = useQuery({ queryKey: ['getMe'], queryFn: getMe });

  return { result };
}

export default useIfLogin;
