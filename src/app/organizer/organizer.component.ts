import { TaskService, Task } from './../shared/tasks.service';
import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: Task[] = [];

  constructor(public readonly dateService: DateService, private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
        switchMap(value => this.taskService.load(value))
      ).subscribe(tasks => this.tasks = tasks);
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };
    this.taskService.create(task).subscribe(res => {
      this.tasks.push(res);
      this.form.reset();
      console.log(res);
    }, console.error);
  }

  remove(task: Task): void {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, console.error);
  }
}
