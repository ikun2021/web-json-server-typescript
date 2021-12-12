import {User,UserProps} from '../models/User'
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';
import { View } from './View';

export class UserEdit extends View<User,UserProps>{
  regionsMap():{[ket:string]:string}{
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    };
  }
  
  //do our nesting here
  onRender():void{
    const userShow = new UserShow(this.regions.userShow,this.model);
    userShow.render();
    const userForm = new UserForm(this.regions.userForm,this.model);
    userForm.render();
  }


  template():string{
    return `
    <div>
      <div class="user-show"></div>
      <div class="user-form"></div>
    </div>
    `
  }
}