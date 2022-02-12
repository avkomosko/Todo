import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  editable = false;
  editedTitle = '';

  @Input() task!: Task;
  @Input() index!: number;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<{id: number, title: string}>();


  edit() {
    this.editable = !this.editable;
    this.editedTitle = this.task.title;
  }

  save() {
    if (this.editedTitle.trim()) {
      this.task.title = this.editedTitle;
      this.onEdit.emit({
      id: this.task.id,
      title: this.task.title
    });
    }
    this.editable = !this.editable;
  }

  delete() {
    this.onDelete.emit(this.task.id);
  }

  ngOnInit(): void {
  }

}
