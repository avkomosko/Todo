import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

type FormData = {
  [key: string]: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  minLength = 2;
  form!: FormGroup;
  formData!: FormData;

  @Output() onAdd = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<string>();
  @Output() onFind = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<string>();

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required ,Validators.minLength(this.minLength)
      ]),
      filterAndSort: new FormGroup({
        sort: new FormControl(''),
        find: new FormControl('', Validators.minLength(this.minLength)),
        filter: new FormControl('all')
      })
    })
  }

  find() {
    const find = this.form.get('filterAndSort')?.get('find')?.value;
    this.form.patchValue({address: {find}});
    this.onFind.emit(find);
  }

  findStatus() {
    return this.form.get('filterAndSort')?.get('find')?.value === '' ? true : false;
  }

  checkStatus(str : string) {
    const selected = this.form.get('filterAndSort')?.get('filter')?.value;
    return str === selected;
  }

  cancelFind() {
    this.onFind.emit('');
    this.form.get('filterAndSort')?.get('find')?.patchValue('');
  }

  select() {
    const sort = this.form.get('filterAndSort')?.get('sort')?.value;
    this.onSort.emit(sort);
  }

  filter(str: string) {
    this.form.get('filterAndSort')?.get('filter')?.patchValue(str);
    const filter = this.form.get('filterAndSort')?.get('filter')?.value;
    this.onFilter.emit(filter);
  }

  emitNewTaskTitle() {
    this.formData = {...this.form.value};
    const {title} = this.formData;
    this.onAdd.emit(title);
  }

  submit() {
    this.emitNewTaskTitle();
    this.form.reset();
  }

}
