// src/app/models/flat-owner-profile.model.ts

import { User } from './user.model';

export interface FlatOwnerProfile {
  userId: number;
  user: User;
}
