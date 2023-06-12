import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit, OnDestroy {
  private _subCurUser !: Subscription;
  action = 1;
  curUser !: User;
  error: string = "";

  constructor(private _userService: UserService, private _router: Router) {
  }

  onChangeConnect(action: number) {
    this.action = action;
  }

  onSubmitConnect(form: NgForm) {
    console.log("=== onSubmit Connexion")
    if (form.valid) {
      const user = new User(form.value.nameInput, form.value.pwdInput);

      if (this.action == 0) {
        console.log('== Creer User');

        this._userService.addOne(user).subscribe({
          next: () => {
            this._userService.getOneByName(user.name, user.pwd);
          },
          error: () => {
            this.error = "FAIL CREATION USER";
            console.log("FAIL CREATION USER");
          }
        });

      } else if (this.action == 1) {
        console.log('=== Se co');
        this._userService.getOneByName(user.name, user.pwd);
      }

      setTimeout(() => {
        if (this.curUser.logged) {
          this.error = "";
          this.curUser.logged = true;

          this._router.navigateByUrl("home/" + this.curUser.id);
        } else {
          this.error = "Identifiant non trouvé";
        }
      }, 1000);

    }
  }

  ngOnInit(): void {
    this._subCurUser = this._userService.user$.subscribe(
      user => {
        console.log("=== init Connexion");
        this.curUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    this._subCurUser.unsubscribe();
  }
}