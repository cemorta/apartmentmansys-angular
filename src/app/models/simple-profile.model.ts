// src/app/models/flat-owner-profile.model.ts

import { User } from './user.model';

export interface SimpleProfile {
  userId: number;
  user: User;
}
