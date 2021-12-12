import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T>{
  set(updateData:T):void;
  getAll():T;
  get<K extends keyof T>(key: K): T[K];
}

interface ModelSync<T>{
  fetch(id:number):AxiosPromise;
  save(data: T):AxiosPromise;
}

interface ModelEvents{
  on(eventName:string,callback:()=>void):void;
  trigger(eventName:string):void;

}

interface HasId{
  id?:number;
}

export class Model<T extends HasId>{
  constructor(
    private attributes:ModelAttributes<T>,
    private events: ModelEvents,
    private sync : ModelSync<T>
  ){}

  //这种实现方法不好 当on方法改变时，所有的on都要改变
  // on(eventName:string, callback:CallBack):void{
  //   this.events.on(eventName,callback);
  // }  

  //也可以写成 on = this.events.on
  get on(){
    return this.events.on;
  }
  //也可以写成 on = this.events.on

  get trigger(){
    return this.events.trigger;
  }

  // trigger(eventName:string):void{
  //   this.events.trigger(eventName);
  // }

  get get(){
    return this.attributes.get;
  }

  // get(key:keyof UserProps):UserProps[key]{
  //   return this.attributes.get(key);
  // }
  

  //set以后trigger一个change event
  set(updateData: T):void{
    this.attributes.set(updateData);
    this.trigger('change');
  }

  fetch(): void{
    const id = this.attributes.get('id');

    if(typeof id !== 'number'){
      throw new Error('id not found!');
    }
    this.sync.fetch(id).then((response:AxiosResponse):void=>{
      this.set(response.data);
    });
  }

  
  save():void{
     const data = this.attributes.getAll();
     this.sync.save(data) .then((response:AxiosResponse):void=>{
      this.trigger('save');
     })
     .catch(()=>{
       this.trigger('error');
     });
     
  }

}