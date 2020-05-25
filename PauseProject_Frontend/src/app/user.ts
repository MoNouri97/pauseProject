export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  description?: string;
  createdAt?: number;
  lastLoginAt?: number;
  totalLikes?: number;
}
