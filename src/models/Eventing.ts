
//如果是()=>{} 会返回Object
type CallBack = () => void;

export class Eventing{
  //events是个object，key是string，value是CallBack array
  events:{[key:string]:CallBack[]}={}
  
  //register the function in events
  on = (eventName:string, callback:CallBack):void =>{
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
  
  //运行handlers中所有的callback function
  trigger = (eventName:string):void =>{
    const handlers = this.events[eventName];
    if(!handlers || handlers.length===0){ 
      return;
    }
    handlers.forEach(callback =>{
      callback();
    });
  }
}