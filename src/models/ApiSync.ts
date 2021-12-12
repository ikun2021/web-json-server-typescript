import axios, { AxiosPromise, AxiosResponse } from "axios";


interface HasId{
  id?:number;
}

export class ApiSync<T extends HasId>{
  constructor(public rootUrl:string){}

  fetch(id:number): AxiosPromise {
    const promise = axios.get(`${this.rootUrl}/${id}`) ;
    return promise; //return a Promise
  } 
  
  //user有id，说明save过了  update-put
  //user没有id  新的 add-post
  save(data: T):AxiosPromise{
    const {id} = data;

    if(id){
      //put
      return axios.put(`${this.rootUrl}/${id}`,data);
    }else{
      //post
      return axios.post(this.rootUrl,data);
    }
  }
}