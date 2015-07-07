export {UsersService, IUser} from './services/users-service';
export {UsersList} from './users-list/users-list';
export {UsersHome} from './users-home/users-home';
export {UserDetails} from './user-details/user-details';

import {Component, View, NgIf} from 'angular2/angular2';
import {RouteConfig, routerDirectives} from 'angular2/router';

import {UsersList} from './users-list/users-list';
import {UsersHome} from './users-home/users-home';
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
  directives: [routerDirectives, NgIf, UsersList]
})
export class Users {
  users: Array<any>;
  loading = true;
  constructor(private usersService: UsersService) {
    usersService
      .getUsers()
      .then(users => {
        this.users = users;
        // To be removed when component activation will work.
        this.loading = false;
      });
  }
  // --------------------------------
  // Not supported by ng2 router yet.
  canActivate() {
    this.loading = true;
    this.usersService.getUsers();
  }
  activate() {
    console.info('Component router activation works now !');
    this.loading = false;
  }
}
