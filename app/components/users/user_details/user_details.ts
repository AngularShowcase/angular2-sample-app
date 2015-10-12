import {Component, Inject, NgIf} from 'angular2/angular2';
import {RouteParams, RouterLink} from 'angular2/router';
import {UserService, IUser} from '../services/user_service';

@Component({
  selector: 'user-details',
  templateUrl: './components/users/user_details/user_details.html',
  directives: [NgIf, RouterLink]
})
export class UserDetails {
  user: IUser;
  constructor(@Inject(RouteParams) routeParams,
              private userService: UserService) {
    let username = routeParams.params.username;
    userService
      .getUser(username)
      .then(user => this.user = user);
  }
}
