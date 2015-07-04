import {Component, View} from 'angular2/angular2';
import {UsersService, IUser} from '../services/users-service';

@Component({
  selector: 'user-details'
})
@View({
  templateUrl: './components/users/user-details/user-details.html?v=<%= VERSION %>'
})
export class UserDetails {
  user: IUser;
  constructor(private usersService: UsersService) {
    this.user = usersService.getSelectedUser();
  }
}
