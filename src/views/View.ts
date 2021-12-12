import { Model } from "../models/Model";


export abstract class View<T extends Model<K>, K > {
  regions:{ [key:string]:Element} ={};
  // {userShow : Element as the parent element}

  constructor(public parent: Element, public model: T){
    this.bindModel();
  }

  abstract template():string;
  

  //call regionsMap for list of regions that need to be created
  //render method populated values in regions 
  //insert new child views in those regions
  //at last,render inserts content of tempate into DOM
  regionsMap():{[ket:string]:string}{
    return {};

    //{userShow:".user-show", userForm:".user-form"}
  }

  eventsMap(): {[key:string]: ()=>void} {
    return {}
  }

  bindModel():void{
    this.model.on('change',()=>{
      this.render();
    });
  }
  
  bindEvents(fragment:DocumentFragment):void{
    const map = this.eventsMap();
    for(let eventKey in map){
      const[eventName,selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element =>{
        element.addEventListener(eventName,map[eventKey]);
      });
    }
  }

  mapRegions(fragment:DocumentFragment):void{
    const regionsMap = this.regionsMap();
    
    //遍历需要创建的region
    for(let key in regionsMap){
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if(element){
        this.regions[key] = element;
      }

    }
  }
  
  onRender():void{
    
  }
 
  render():void{
    //先清零
    this.parent.innerHTML = '';
    //用template把string转成html
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.mapRegions(templateElement.content);

    
    //nest UserForm and UserShow in UserEdit
    this.onRender();

    //把template的html加到parent html element中
    this.parent.append(templateElement.content);
  }
}