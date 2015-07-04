import {Component, View, Inject, NgFor, Directive, ElementRef} from 'angular2/angular2';
import {Router, routerDirectives} from 'angular2/router';

import {UsersService} from '../services/users-service';
import {SetActive} from '../../../directives/set-active';

@Directive({
  selector: '[test]'
})
class TestDirective {
  constructor(el: ElementRef) {
    console.log(el);
  }
}

@Component({
  selector: 'users-list',
  properties: ['users']
})
@View({
  templateUrl: './components/users/users-list/users-list.html?v=<%= VERSION %>',
  styles: ['user-details { display: block; }'],
  directives: [NgFor, routerDirectives, SetActive]
})
export class UsersList {
  constructor(private usersService: UsersService) {}

  select(user) {
    this.usersService.setSelectedUser(user);
  }
}
