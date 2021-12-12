import axios, { AxiosPromise, AxiosResponse } from "axios";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Model } from "./Model";
import { ModelCollection } from "./ModelCollection";
//安装json server（后端server来save和fetch数据）
//npm install -g json-server   在根目录创建db.json作为数据库来存放数据
//命令行json-server -w db.json
//npm install axios


//optional attribute 加问号
export interface UserProps{
  id?:number;
  name?:string;
  age?:number;
}

//如果是()=>{} 会返回Object
type CallBack = () => void;

const rootUrl = 'http://localhost:3000/users'

/**
 * option 1: accept dependencies as second constructor argument
 * 缺点： 每次初始化user的时候就要new很多attributes
 * 
 * option 2: only accept dependency into constructor
 * define a static class method to preconfigure
 * User and assign properties afterwards
 * 
 * option 3: only accept properties into constructor
 * hard code dependency as class properties
 */
export class User extends Model<UserProps>{
  //initialize user
  static buildUser(attrs:UserProps):User{
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection():ModelCollection<User,UserProps>{
    return new ModelCollection<User,UserProps>(
        rootUrl,
        (data:UserProps)=>User.buildUser(data));
  }

  setRandomAge():void{
    const age = Math.round(Math.random()*100);
    this.set({age});
  }
}


