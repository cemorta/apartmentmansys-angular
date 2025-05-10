import { MaintenanceRequest } from './maintenance-request.model';

export interface MaintenanceRequestAssignmentModel {
  id: number;
  requestId: number;
  maintenanceRequest: MaintenanceRequest | null;
  staffId: number;
  assignedAt: string;
  notes: string;
}
