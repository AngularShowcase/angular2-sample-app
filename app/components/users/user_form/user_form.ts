import {Component, Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {UserService, IUser} from '../services/user_service';

@Component({
  selector: 'user-form',
  templateUrl: './components/users/user_form/user_form.html'
})
export class UserFormCmp {
  user: IUser;
  username: string = this.routeParams.params ? this.routeParams.params.username : undefined;
  constructor(@Inject(RouteParams) private routeParams,
              private userService: UserService) {
    if (this.username) {
      userService.getUser(this.username)
        .then(user => this.user = user);
    } else {
      // TODO: add User model
      this.user = <IUser>{ name: { first: '', last: '' } };
    }
  }
  onSave(model) {
    if (this.username) {
      this.user.name.first = model.name.first;
      this.user.name.last = model.name.last;
      return;
    }
    // Fix as user-details expect a picture property.
    // ng2 does not fail silently when a property isn't
    // defined on a binding.
    model.picture = {};
    this.userService.saveUser(model);
    return false;
  }
}
