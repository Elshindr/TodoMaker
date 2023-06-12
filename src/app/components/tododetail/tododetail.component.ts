import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.scss']
})
export class TododetailComponent {
  todo!:Todo;
  _sub!: Subscription;
  _subRoute!:Subscription;
  onEdit = false;
  titleEdit = "";
  cateEdit = "";

  constructor(private _todoService: TodoService, private _router:Router, private _route: ActivatedRoute) {
  }


  onRemove(){
    const idUser = this.todo.idUser;
    const res = this._todoService.removeOne(this.todo);
    if(res){
      this._router.navigateByUrl("liste/" + idUser);
    }else{
      console.log("Fail DELETE TODO");
    }
  }

  
  onChangeDone() {
    console.log(this.todo)
    this.todo.done = !this.todo.done;
    this._todoService.updateOne(this.todo).subscribe({
      next: (nwTodo: Todo) => {
        console.log("OK")
      },
      error: () => {
        console.log("FAIL MODIF DONE");
      }
    })
  }


  editTodo(titre:string, categorie:string) {
    this.onEdit = !this.onEdit;

    if(!this.onEdit){
      this.todo.text = titre;
      this.todo.categorie = categorie.toLowerCase();

      this._todoService.updateOne(this.todo).subscribe({
        next: () => {
          console.log("ok");
        },
        error: () => {
          console.log("error update");
        }
      });

    } else if (this.onEdit){
      this.titleEdit = this.todo.text;
      this.cateEdit = this.todo.categorie;
    }
  }


  ngOnInit(){
    let todoId = "";
    this._subRoute = this._route.params.subscribe(params => {
      console.log(params) ;
      console.log("test:" +params['idUser']) ;
      todoId = params['id'];
    });

    if(todoId != ""){
      this._todoService.getOneById(parseInt(todoId));
      
      this._sub = this._todoService.todo$.subscribe(
        todo => {
          this.todo = todo;
        }
      );
    }else{
      console.log("g fail <3");
    }
  }


  ngOnDestroy(){
    this._sub.unsubscribe();
    this._subRoute.unsubscribe();
  }
}

