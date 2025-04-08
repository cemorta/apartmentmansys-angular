// src/app/models/user.model.ts
import {FlatOwnerProfile} from './flat-owner-profile.model';
import {SimpleProfile} from './simple-profile.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string; // ISO date-time string
  roles: string[];
  flatOwnerProfile: SimpleProfile;
  adminProfile: SimpleProfile;
  residentProfile: SimpleProfile;
  staffProfile: SimpleProfile;
}
