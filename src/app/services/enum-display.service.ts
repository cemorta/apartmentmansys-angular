import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumDisplayService {

  // Maps for displaying friendly names for enum values
  private categoryDisplayMap: Record<string, string> = {
    'PLUMBING': 'Plumbing',
    'ELECTRICAL': 'Electrical',
    'HVAC': 'HVAC',
    'APPLIANCE': 'Appliance',
    'GENERAL': 'General'
  };

  private priorityDisplayMap: Record<string, string> = {
    'LOW': 'Low',
    'MEDIUM': 'Medium',
    'HIGH': 'High'
  };

  private statusDisplayMap: Record<string, string> = {
    'PENDING': 'Pending',
    'IN_PROGRESS': 'In Progress',
    'COMPLETED': 'Completed',
    'CANCELED': 'Canceled'
  };

  constructor() { }

  /**
   * Gets the display value for a category enum
   */
  getCategoryDisplay(category: string): string {
    return this.categoryDisplayMap[category] || category;
  }

  /**
   * Gets the display value for a priority enum
   */
  getPriorityDisplay(priority: string): string {
    return this.priorityDisplayMap[priority] || priority;
  }

  /**
   * Gets the display value for a status enum
   */
  getStatusDisplay(status: string): string {
    return this.statusDisplayMap[status] || status;
  }

  /**
   * Helper method for getting the internal enum value from a display string
   * For example, going from "In Progress" to "IN_PROGRESS"
   */
  getInternalStatusValue(displayStatus: string): string | undefined {
    const entry = Object.entries(this.statusDisplayMap)
      .find(([_, value]) => value === displayStatus);
    return entry ? entry[0] : undefined;
  }

  /**
   * Helper method for getting the internal enum value from a display string
   * For example, going from "Plumbing" to "PLUMBING"
   */
  getInternalCategoryValue(displayCategory: string): string | undefined {
    const entry = Object.entries(this.categoryDisplayMap)
      .find(([_, value]) => value === displayCategory);
    return entry ? entry[0] : undefined;
  }

  /**
   * Helper method for getting the internal enum value from a display string
   * For example, going from "High" to "HIGH"
   */
  getInternalPriorityValue(displayPriority: string): string | undefined {
    const entry = Object.entries(this.priorityDisplayMap)
      .find(([_, value]) => value === displayPriority);
    return entry ? entry[0] : undefined;
  }
}
