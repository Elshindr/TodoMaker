export class User {
  public logged = false;
  public id!:number;

  constructor(public name:string, public pwd:string){
  }
/*
  public isLogged(){
    if(this.logged){
      return true;
    }
    else{
      return false;
    }
  }*/

  public setId(id :number){
    this.id = id;
  }
/*
  public setLogged(value: boolean){
    this.logged = value;
  }*/

}
