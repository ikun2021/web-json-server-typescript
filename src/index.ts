import { ModelCollection } from "./models/ModelCollection";
import { User, UserProps } from "./models/User";
import { UserCollection } from "./views/UserCollection";
import { UserEdit } from "./views/UserEdit";
import { UserForm } from "./views/UserForm";

// const user= User.buildUser({name:'tom',age:20})

// const element = document.getElementById('root');

// if(element){
//   const userEdit = new UserEdit(
//     element,user
//   );
//   userEdit.render();
//   console.log(userEdit.regions);
// }else{
//   throw new Error('root element not found!')
// }

const users = new ModelCollection<User,UserProps>(
  'http://localhost:3000/users',
  (data:UserProps)=>User.buildUser(data)
);

users.on('change',()=>{
  const root  = document.getElementById('root');
  if(root){
    new UserCollection(root,users).render();
  }
});

users.fetch();

