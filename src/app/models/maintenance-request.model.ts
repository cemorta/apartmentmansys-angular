export interface MaintenanceRequest {
  id: number;
  residentUserId: number;
  flatId: number;
  description: string;
  category: 'PLUMBING' | 'ELECTRICAL' | 'HVAC' | 'APPLIANCE' | 'GENERAL';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  createdAt: string;
  completedAt: string | null;
  residentName?: string; // Optional field that might be populated from a joined query
}
