import {Component, Inject, OnInit} from 'angular2/core';
import {RouteParams, RouterLink} from 'angular2/router';
import {UserService, IUser} from '../services/user_service';

@Component({
  selector: 'user-details',
  templateUrl: './components/users/user_details/user_details.html',
  directives: [RouterLink]
})
export class UserDetailsCmp implements OnInit {
  user: IUser;
  username: string;
  constructor(@Inject(RouteParams) routeParams,
              private userService: UserService) {
    this.username = routeParams.params.username;
  }
  ngOnInit() {
    this.userService
      .getUser(this.username)
      .then(user => this.user = user);
  }
}
