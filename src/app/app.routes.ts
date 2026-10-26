import { Routes } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager';

export const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent
  },
  {
    path: ':id',
    component: TaskManagerComponent
  }
];