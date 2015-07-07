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
  constructor(
    private usersService: UsersService,
    @Inject(RouteParams) routeParams
  ) {
    let username = routeParams.params.username;
    if (username) {
      let selectedUser;
      this.usersService
        .getUser(username)
        .then(user => this.user = user);
    }
  }
}
