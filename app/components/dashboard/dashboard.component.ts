import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, AppHeaderComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  currentDate: Date = new Date();

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit() {
    this.refreshTasks();
  }

  onTasksUpdated(updatedTasks: Task[]) {
    this.tasks = updatedTasks;
  }
  onFilterChanged(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;
  }

  refreshTasks() {
    const username = this.authService.getUsername();
    if (username) {
      this.taskService.getTasksByUsername(username).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }

  myFunc(){
    console.log("clicked on all delete");
  }

}
