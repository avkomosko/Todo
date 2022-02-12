import { Component, OnInit } from '@angular/core';
import { Task } from './models/interfaces';

type PartTask = Pick<Task, 'id'| 'title' >;

interface TasksState {
  all: Task[],
  find: Task[],
  filtered: Task[],
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  counter = 0;
  findWord = '';
  sorting = 'up';
  tasksBackup: TasksState = {
    all: [],
    find: [],
    filtered: [],
  };

  tasks: Task[] = [{
    id: 555,
    title: 'todo',
    completed: false
  },{
    id: 666,
    title: '23',
    completed: true
  }];

  ngOnInit() {
    this.saveTasksToState();
  }

  saveTasksToState() {
    this.tasksBackup.all = [...this.tasks];
  }

  restoreTasksFromState() {
    this.tasks = [...this.tasksBackup.all];
  }

  addTask(title: string) {
    this.counter++;
    const task: Task = {
      id: this.counter,
      title,
      completed: false
    }
    this.tasks.push(task);
    this.saveTasksToState();
  }

  find(str: string) {
    if (str.trim()) {
      this.saveTasksToState();
      this.tasksBackup.find = this.tasks.filter(el => el.title.includes(str));
      this.tasks = this.tasksBackup.find;
    } else {
      this.restoreTasksFromState();
    }
  }

  filter(str: string) {
    this.restoreTasksFromState();
    switch (str) {
      case 'done':
        this.saveTasksToState();
        this.tasksBackup.filtered = this.tasks.filter(el => el.completed);
        this.tasks = this.tasksBackup.filtered;
        break;
      case 'undone':
        this.saveTasksToState();
        this.tasksBackup.filtered = this.tasks.filter(el => !el.completed);
        this.tasks = this.tasksBackup.filtered;
        break;
      case 'all':
        this.restoreTasksFromState();
        break;
      default:
      break;
    }
  }

  sort(str: string) {
    if (str === 'up') {
      this.tasks.sort((a, b) => (a.id - b.id));
    } else {
      this.tasks.sort((a, b) => (b.id - a.id));
    }
  }

  saveTask(part: PartTask){
    this.tasks.forEach(el => {
      if(el.id === part.id) {
        el.title = part.title;
      }
    });
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(el => el.id !== id);
  }

}
