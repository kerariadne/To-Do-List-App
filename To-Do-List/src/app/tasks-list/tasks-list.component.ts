import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  tasks: Task[] = [];

  newTask: Task = {
    id: '',
    name: '',
    status: '',
  };

  isEditButtonClicked: boolean = false;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  addTask(): void {
    console.log(this.newTask);
    if (!this.newTask.name || !this.newTask.status) {
      return; 
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = { id: '', name: '', status: '' };
      },
      error: (error) => {
        console.error('Error adding task:', error);
      },
    });
  }

  getTask(task: Task): void {
    this.selectedTask = task;
    this.newTask.id = task.id; 
    this.newTask.name = task.name;
    this.newTask.status = task.status;
    this.isEditButtonClicked = true;
    console.log(this.newTask);
    console.log(task);
  }

  editTask(task: Task): void {
    this.taskService.updateTask(task.id, task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.newTask = { id: '', name: '', status: '' };
          this.isEditButtonClicked = false;
        }
      },
      error: (error) => {
        console.error('Error updating task:', error);
      },
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
