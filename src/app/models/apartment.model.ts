import { ApartmentOwnership } from "./apartment-ownership.model";

// src/app/models/apartment.model.ts
export interface Apartment {
  id: number;
  buildingName: string;
  unitNumber: string;
  floor: number;
  ownerships?: ApartmentOwnership[];
}
