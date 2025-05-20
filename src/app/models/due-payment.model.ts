import { Flat } from './flat.model';
import { Due } from './due.model';

export interface DuePayment {
  id: number;
  dueId: number;
  flatId: number;
  isPaymentComplete: boolean;
  createdAt: string;
  paidAt?: string;
  due?: Due;
  flat?: Flat;
}
