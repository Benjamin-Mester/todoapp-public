// ============================================================
// TASK STATUS
// ============================================================

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed'
}


// ============================================================
// TASK PRIORITY
// ============================================================

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}


// ============================================================
// USER
// ============================================================

export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

// ============================================================
// Colleagues
// ============================================================

export interface ColleaguesInterface {
  id: number;
  name: string;
  email: string;
}


// ============================================================
// TASK
// ============================================================

export interface TaskInterface {
  id: number;

  name: string;

  description: string;

  email: string;

  creationDate: Date;

  dueDate: Date | null;

  status: TaskStatus;

  priority: TaskPriority;

  assignedTo?: UserInterface;

  taskFrom?: ColleaguesInterface;
}