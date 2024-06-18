import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService, private authService: AuthService) { }

  addTask() {
    const username = this.authService.getUsername();
    if (username && this.title && this.description) {
      const newTask: Task = {
        id: 0,
        username: username,
        title: this.title,
        description: this.description,
        status: false,
        date: new Date()
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.taskAdded.emit();
        this.closeModal.emit();
      });
    }
  }

  close() {
    this.closeModal.emit();
  }
}