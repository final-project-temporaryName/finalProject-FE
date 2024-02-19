'use client';

import { getMe } from '@/api/auth/getMe';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function CheckRegular() {
  const router = useRouter();

  const { data } = useQuery({ queryKey: ['getMe'], queryFn: getMe });
  if (data?.role === 'REGULAR') router.back();

  return null;
}
