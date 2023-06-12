import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-todolst',
  templateUrl: './todolst.component.html',
  styleUrls: ['./todolst.component.scss'],
})

export class TodolstComponent implements OnInit, OnDestroy {
  lstTodos: Todo[] = [];
  lstTodosDone: Todo[] = [];
  lstTodosCurr: Todo[] = [];
  curUser!: User;

  lstCategories: string[] = [];
  error: string = "";

  private _subTodo!: Subscription;
  private _subUser!: Subscription;

  constructor(private _userService: UserService, private _todoService: TodoService) {
  }


  onSelectCategorie(categorie: string) {

    this._todoService.lstTodos$.subscribe(
      todosDatas => {
        this.lstTodos = todosDatas;
      }
    );

    if (categorie != "All") {
      this.lstTodos = this.lstTodos.filter(todo => todo.categorie == categorie);
    }
    this.setLstsTodos();
  }


  onChangeDone(todo: Todo) {
    todo.done = !todo.done;
    this._todoService.updateOne(todo).subscribe({
      next: (nwTodo: Todo) => {
        console.log("OK")
      },
      error: () => {
        console.log("FAIL MODIF DONE");
      }
    })
  }


  onSubmitAddTodo(form: NgForm) {
    if (form.valid) {
      const todo = new Todo(form.value.text, form.value.done, form.value.categorie.toLowerCase(), this.curUser.id);

      this._todoService.addOne(todo).subscribe({
        next: (nwTodo: Todo) => {
          this.setLstCategories();
          form.reset();
        },
        error: () => {
          this.error = "Erreur dans la création";
          console.log("FAIL CREATION TODO");
        }
      });

    }
  }


  setLstCategories() {
    this.lstTodos.forEach(todo => {
      if (!this.lstCategories.includes(todo.categorie)) {
        this.lstCategories.push(todo.categorie);
      }
    });
  }


  setLstsTodos() {
    this.lstTodosCurr = [];
    this.lstTodosDone = [];

    this.lstTodos.forEach(elm => {

      if (elm.done) {
        this.lstTodosDone.push(elm);
      } else if (!elm.done) {
        this.lstTodosCurr.push(elm);
      }
    });
  }


  ngOnInit() {
    console.log("=== list init");

    this._subUser = this._userService.user$.subscribe(
      user => {
        this.curUser = user;
      });

    if (this.curUser.id != undefined) {
      this._todoService.getAllTodosByIdUser(this.curUser.id);

      this._subTodo = this._todoService.lstTodos$.subscribe(
        todos => {
          setTimeout(() => {
            this.lstTodos = todos;
            this.setLstCategories();
            this.setLstsTodos();

          }, 1000);
        }
      );
    }
  }

  ngOnDestroy() {
    this._subTodo.unsubscribe();
    this._subUser.unsubscribe();
  }
}
