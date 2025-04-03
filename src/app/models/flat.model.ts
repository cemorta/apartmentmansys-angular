// src/app/models/flat.model.ts

import { Apartment } from './apartment.model';
import {FlatOccupant} from './flat-occupant.model';
import {User} from './user.model';

export interface Flat {
  id: number;
  apartment: Apartment | null;
  apartmentId: number | null;
  flatNumber: string;
  floorNumber: number;
  area: number;
  numBedrooms: number | null;
  numBathrooms: number | null;
  owner: User | null;
  flatOccupants?: FlatOccupant[];
  createdAt: string; // ISO date-time string
}
