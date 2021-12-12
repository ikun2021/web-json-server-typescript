import {User,UserProps} from '../models/User'
import { View } from './View';

export class UserForm extends View<User,UserProps>{
  
  eventsMap():{[key:string]: ()=>void}{
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    };
  }

  //把user的信息导入template里面
  //把input的信息提交后更新template的user信息
  template():string{
    return`
    <div>
      <input placeholder="${this.model.get('name')}"/>
      <button class='set-name'>Change Name</button> 
      <button class='set-age'>Set Random Age</button>
      <button class='save-model'>Save</button>
    </div>
    `;
  }

  onSaveClick = ():void =>{
    this.model.save();
  }

  onSetNameClick = ():void=>{
    const input = this.parent.querySelector('input');
    if(input){
      const name = input.value;
      this.model.set({name});
    }
    
  }
  
  //user发生变化时，要re-render，重新生成template，再加入到页面中
  onSetAgeClick= ():void => {
    this.model.setRandomAge();
    // this.render();  不可行，会增加多余的UserForm
  }
}

