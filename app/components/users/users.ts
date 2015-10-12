import {Component, NgIf, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {UsersList} from './users_list/users_list';
import {UsersHome} from './users_home/users_home';
import {UserDetails} from './user_details/user_details';
import {UserForm} from './user_form/user_form';
import {UserService} from './services/user_service';

import {LoadingBtn} from '../../directives/loading_btn';

@Component({
  selector: 'users',
  templateUrl: './components/users/users.html',
  styleUrls: ['./components/users/users.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, NgIf, UsersList, LoadingBtn]
})
@RouteConfig([
  { path: '/', redirectTo: '/home' },
  { path: '/home', component: UsersHome, as: 'Users-home' },
  { path: '/show/:username', component: UserDetails, as: 'User-details' },
  { path: '/edit/:username', component: UserForm, as: 'User-edit' },
  { path: '/create', component: UserForm, as: 'User-create' }
])
export class Users {
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
  // --------------------------------
  // Not supported by ng2 router yet.
  canActivate() {
    console.info('Component router canActivate now works!');
    this.loading = true;
    this.userService.getUsers();
  }
  activate() {
    console.info('Component router activate now works!');
    this.loading = false;
  }
}
