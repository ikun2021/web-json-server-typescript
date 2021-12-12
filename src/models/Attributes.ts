import { UserProps } from "./User";

export class Attributes<T>{
  constructor(private data: T){}

  // get(propName: string): number|string|boolean{
  //    return this.data[propName];
  // }


 //k只能是T这个object的某个key，
 //那么返回的数据，就是T[K]对应的value
 //百分百使用箭函数以避免this的指向错误，
  get = <K extends keyof T>(key: K): T[K] =>{
    return this.data[key];
  }

  getAll = ():T =>{
    return this.data;
  }

  set(updateData: T):void{
    Object.assign(this.data,updateData);
  }
  
}

const attrs = new Attributes<UserProps>(
  {id:5,age:20,name:'tom'}
);

const name = attrs.get('name');
