export {UsersList} from './users-list/users-list';
export {UsersService} from './services/users-service';

import {Component, View, NgFor, Inject, Parent} from 'angular2/angular2';
import {Router, RouteConfig, routerDirectives, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';

import {UsersList} from './users-list/users-list';
import {UsersHome} from './users-home/user-home';
import {UserDetails} from './user-details/user-details';
import {UsersService} from './services/users-service';

@Component({
  selector: 'users'
})
@RouteConfig([
  // { path: '/', redirectTo: '/home' },
  { path: '/home', component: UsersHome, as: 'users-home' },
  { path: '/name/:username', component: UserDetails, as: 'user-details' }
])
@View({
  templateUrl: './components/users/users.html?v=<%= VERSION %>',
  styleUrls: ['./components/users/users.css'],
  directives: [NgFor, routerDirectives, UsersList]
})
export class Users {
  users: Array<any>;
  constructor(private usersService: UsersService) {
    this.users = usersService
      .getAll();
  }
}
