export {UsersService, IUser} from './services/users-service';
export {UsersList} from './users-list/users-list';
export {UsersHome} from './users-home/users-home';
export {UserDetails} from './user-details/user-details';

import {Component, View, NgIf} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {UsersList} from './users-list/users-list';
import {UsersHome} from './users-home/users-home';
import {UserDetails} from './user-details/user-details';
import {UserForm} from './user-form/user-form';
import {UsersService} from './services/users-service';

import {LoadingButton} from '../../directives/loading-button';

@Component({
  selector: 'users'
})
@RouteConfig([
  { path: '/', redirectTo: '/home' },
  { path: '/home', component: UsersHome, as: 'users-home' },
  { path: '/show/:username', component: UserDetails, as: 'user-details' },
  { path: '/edit/:username', component: UserForm, as: 'user-edit' },
  { path: '/create', component: UserForm, as: 'user-create' }
])
@View({
  templateUrl: './components/users/users.html?v=<%= VERSION %>',
  styleUrls: ['./components/users/users.css'],
  directives: [ROUTER_DIRECTIVES, NgIf, UsersList, LoadingButton]
})
export class Users {
  loading = true;
  constructor(public usersService: UsersService) {
    this.usersService
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
    this.usersService.getUsers();
  }
  activate() {
    console.info('Component router activate now works!');
    this.loading = false;
  }
}
