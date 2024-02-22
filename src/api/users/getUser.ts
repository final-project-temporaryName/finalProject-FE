import { request } from '@/api/fetchRequestHandler';
import { UserType } from '@/types/users';

export default async function getUser(id: string | number) {
  const url = `users/${id}`;
  const response = await request<UserType>({ url });

  return response;
}
