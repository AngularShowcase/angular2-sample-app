import {Component, View, Inject, NgIf} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {UsersService, IUser} from '../services/users-service';

@Component({
  selector: 'user-details'
})
@View({
  templateUrl: './components/users/user-details/user-details.html?v=<%= VERSION %>',
  directives: [NgIf]
})
export class UserDetails {
  user: IUser;
  constructor(@Inject(RouteParams) routeParams,
              private usersService: UsersService) {
    let username = routeParams.params.username;
    usersService
      .getUser(username)
      .then(user => this.user = user);
  }
}
