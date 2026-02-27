import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }
}

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified?: null | string | boolean;
  image: string;
  address: string | null;
  phone: string | null;
  status: Boolean;
  timeZone: string | null;
  stripe_customer_id: string | null;
  times: string[];
  createdAt: string;
  updateAt: string;
}
