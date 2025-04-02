// src/app/models/apartment-ownership.model.ts
import {User} from './user.model';

export interface ApartmentOwnership {
  id: number;
  apartmentId: number;
  adminUser: User;
  startDate: string; // ISO date string format "YYYY-MM-DD"
  endDate?: string;  // Optional end date
  active: boolean;
}
