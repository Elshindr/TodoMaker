import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //private _baseUrl = environment.urlApi + '/todos/';
  private _baseUrl = "http://localhost:3000/todos/";
  public lstTodos$ = new BehaviorSubject<Todo[]>([]);
  public todo$     = new BehaviorSubject<Todo>({"id":0,  "done":false, "text":"", selected:false, "categorie": "", "idUser":0});


  constructor(private _http: HttpClient, private _userService: UserService) {
    this.getAllTodosByIdUser(this._userService.user$.value.id);
  }

  public getAllAdmin() :void {
    this._http.get<Todo[]>(this._baseUrl).subscribe(allTodos => {
      this.lstTodos$.next(allTodos)
    });
  }

  public getAllTodosByIdUser(idUser: number) :void {

    let params = new HttpParams();
    params = params.append('idUser', idUser);

    this._http.get<Todo[]>(this._baseUrl, { params: params }).subscribe(allTodos => {
      this.lstTodos$.next(allTodos)

      console.log(allTodos)
    });
  }

  public getOneById(id: number) :void {
    console.log("== getOnebyid todo");
    this._http.get<Todo>(this._baseUrl + id).subscribe(oneTodo => {
      this.todo$.next(oneTodo)
    });
  }

  public addOne(todo:Todo){
    console.log('=== Add one todo');
    return this._http.post<Todo>(this._baseUrl, todo).pipe(
      tap(() => {this.getAllTodosByIdUser(todo.idUser);})
    );
  }

  public updateOne(todo:Todo){
    console.log("=== Update Todo");

    return this._http.put<Todo>(this._baseUrl + todo.id, todo).pipe(
      tap(() => 
        this.getAllTodosByIdUser(todo.idUser))
    );
  }

  public removeOne(todo:Todo){
    console.log("== DELETE ");

    const idUser = todo.idUser;
    let res = false;
    this._http.delete<Todo>(this._baseUrl + todo.id)
    .subscribe( {
      next : () => {
        res = true;
        this.todo$.next(new Todo("", false, "", -1));
        this.getAllTodosByIdUser(idUser);
      },
      error: () => {
        res = false;
      }
    });

    console.log("res");
    console.log(res);
    return res;
  }

  public removeAllByIdUser(idUser: number){
    console.log("=== Remove allTodos");
  
    let params = new HttpParams();
    params = params.append('idUser', idUser);

    this._http.delete<Todo>(this._baseUrl, {params: params}).subscribe(() => 
    this.lstTodos$.next([]));
  }

  public getOne(id: number){
    return this._http.get(this._baseUrl + 'id').pipe();
  }
}