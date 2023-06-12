import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject,tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private _baseUrl = environment.urlApi + "/users/";
  private _baseUrl = "http://localhost:3000/users";
  public user$ = new BehaviorSubject<User>(new User('', ''));

  constructor(private _http: HttpClient) {
    
  }


  public getOneByName(name: string, pwd: string) {
    console.log("== GetONEbyName User");
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('pwd', pwd);

    this._http.get<User[]>(this._baseUrl, { params: params }).subscribe({

      next: (users: User[]) => {
        if(users[0] == undefined || users.length == 0){
          console.log("non trouve undefined")
          console.log(users[0])
          console.log(users);
          this.user$.value.logged = false;

        } else {
          console.log("trouve")
          console.log(users);
          this.user$.next(users[0]);
          users[0].logged = true;
        }
      }
    });
  }

  public addOne(user: User) {
    console.log("== Add One")
    const nwUser = {"id":user.id, "name": user.name, "pwd":user.pwd};
    return this._http.post<User>(this._baseUrl, nwUser).pipe(
      tap((user) => {
        this.getOneByName(user.name, user.name);
      })
    );
  }

  public updateOne(user: User) {
    console.log("== Update User");
    const upUser = {"id":user.id, "name": user.name, "pwd":user.pwd};

    return this._http.put<User>(this._baseUrl + user.id, upUser).pipe(
      tap((user) => {
        this.getOneByName(user.name, user.pwd);
      })
    )
  }

  public removeOne(id: number) {
    console.log("== DELETE");
    this.user$.value.logged = false;
    return this._http.delete<User>(this._baseUrl + id)
      .subscribe(() => {
        this.user$.next(new User("", ""));
      });
  }
}