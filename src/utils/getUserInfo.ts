import { getMe } from '@/api/auth/getMe';
import { useQuery } from '@tanstack/react-query';

interface UserInfo {
  userId: number;
  role: 'ASSOCIATE' | 'REGULAR';
}

function getUserInfo(): UserInfo {
  const { data: userInfo } = useQuery({ queryKey: ['getMe'], queryFn: getMe });

  return userInfo;
}

export default getUserInfo;
