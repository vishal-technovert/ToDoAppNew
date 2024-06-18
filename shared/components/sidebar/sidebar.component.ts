import { Component ,  OnInit,Output,  EventEmitter } from '@angular/core';
import { AddTaskComponent } from '../../../app/components/add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../app/services/auth.service';
import { TaskService, Task } from '../../../app/services/task.service';



@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [AddTaskComponent, CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
  
  tasks: Task[] = [];
  isAddTaskModalVisible = false;
  filter: 'all' | 'active' | 'completed' = 'all';

  @Output() tasksUpdated = new EventEmitter<Task[]>();
  @Output() filterChanged = new EventEmitter<'all' | 'active' | 'completed'>();

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit() {
    this.refreshTasks();
  }

  openAddTaskModal() {
    this.isAddTaskModalVisible = true;
  }

  closeAddTaskModal() {
    this.isAddTaskModalVisible = false;
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.filterChanged.emit(this.filter);
    this.refreshTasks();
  }

  refreshTasks() {
    const username = this.authService.getUsername();
    if (username) {
      this.taskService.getTasksByUsername(username).subscribe((tasks: Task[]) => {
        if (this.filter === 'active') {
          this.tasks = tasks.filter(task => !task.status);
        } else if (this.filter === 'completed') {
          this.tasks = tasks.filter(task => task.status);
        } else {
          this.tasks = tasks;
        }
        this.tasksUpdated.emit(this.tasks);  
      }, (error) => {
        console.error('Error fetching tasks:', error);
      });
    }
  }
}
