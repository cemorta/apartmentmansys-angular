// flat-occupant.model.ts
import {Flat} from './flat.model';
import {User} from './user.model';

export interface FlatOccupant {
  flatId: number;
  residentUserId: number;
  flatDto: Flat | null;
  userDto: User;
  leaseStartDate: string;
  leaseEndDate: string;
  primary: boolean;
}
