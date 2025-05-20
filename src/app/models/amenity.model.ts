export interface Amenity {
  id: number;
  title: string;
  openingHour: string; // "08:00"
  closingHour: string;
  maxPerson: number;
  timeSliceMinutes: number;
}
