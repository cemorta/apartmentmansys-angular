// src/app/models/user.model.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string; // ISO date-time string
  roles: string[];
}
