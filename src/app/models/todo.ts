export class Todo{
  public selected = false;

  public id!: number;
  constructor(public text: string, public done:boolean,  public categorie:string, public idUser:number )
  {}
}