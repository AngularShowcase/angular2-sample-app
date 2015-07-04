import {Component, View, Inject, NgFor} from 'angular2/angular2';
import {Router, routerDirectives} from 'angular2/router';

import {UsersService} from '../services/users-service';

@Component({
  selector: 'users-list',
  properties: ['users']
})
@View({
  templateUrl: './components/users/users-list/users-list.html?v=<%= VERSION %>',
  styles: ['user-details { display: block; }'],
  directives: [NgFor, routerDirectives]
})
export class UsersList {
  constructor(private usersService: UsersService) {}

  select(user) {
    this.usersService.selectUser(user);
  }
}
