import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common'; // 👈 importieren

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgClass], // 👈 hinzufügen
  templateUrl: './todo.html',
  styleUrls: ['./todo.css'],
})
export class Todo {
  @Input() todo!: { todo: string; done: boolean };

  logIndex() {
    console.log(this.todo);
  }
}