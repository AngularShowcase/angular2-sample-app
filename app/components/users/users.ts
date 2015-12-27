import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, CanActivate, OnActivate, ComponentInstruction} from 'angular2/router';

import {UsersListCmp} from './users_list/users_list';
import {UsersHomeCmp} from './users_home/users_home';
import {UserDetailsCmp} from './user_details/user_details';
import {UserFormCmp} from './user_form/user_form';
import {UserService} from './services/user_service';

import {LoadingBtn} from '../../directives/loading_btn';

@Component({
  selector: 'users',
  templateUrl: './components/users/users.html',
  styleUrls: ['./components/users/users.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, UsersListCmp, LoadingBtn]
})
@RouteConfig([
  { path: '/home', component: UsersHomeCmp, as: 'Users-home', useAsDefault: true },
  { path: '/show/:username', component: UserDetailsCmp, as: 'User-details' },
  { path: '/edit/:username', component: UserFormCmp, as: 'User-edit' },
  { path: '/create', component: UserFormCmp, as: 'User-create' }
])
@CanActivate((next: ComponentInstruction, prev: ComponentInstruction) => {
  console.info('Component router CanActivate hook! - can return boolean or Promise');
  return true;
})
export class UsersCmp implements OnActivate {
  public loading:boolean = true;
  constructor(public userService: UserService) {
    this.userService
      .getUsers()
      .then(users => {
        // To be removed when component activation will work.
        this.loading = false;
      });
  }
  eventHandler(value: any) {
    console.log(`Example of handling custom events: ${value}`);
  }
  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    console.info('Component routerOnActivate works!');
    this.loading = false;
  }
}
