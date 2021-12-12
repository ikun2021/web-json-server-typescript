import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import {User,UserProps } from "./User";


//k代表fetch的json data
export class ModelCollection<T, K>{
  models: T[] = [];
  events: Eventing = new Eventing();
  
  constructor(
    public rootUrl:string,
    public deserialize:(data:K) => T  //将json数据转化成Object
    ){}

  get on(){
    return this.events.on;
  }

  get trigger(){
    return this.events.trigger;
  }

  fetch():void{
    axios.get(this.rootUrl).then((response:AxiosResponse)=>{
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger('change');
    });
  } 
}

// const userCollection = new ModelCollection<User,UserProps>(
//   'http://localhost:3000/users',
//   (data:UserProps)=>User.buildUser(data)
// );