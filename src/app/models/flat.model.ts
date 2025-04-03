// src/app/models/flat.model.ts

import { Apartment } from './apartment.model';
import { FlatOwnerProfile } from './flat-owner-profile.model';

export interface Flat {
  id: number;
  apartment: Apartment | null;
  flatNumber: string;
  floorNumber: number;
  area: number;
  numBedrooms: number | null;
  numBathrooms: number | null;
  owner: FlatOwnerProfile | null;
  createdAt: string; // ISO date-time string
}
