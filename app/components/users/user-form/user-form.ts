import {Component, View, NgIf, Inject, FORM_DIRECTIVES} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {UsersService, IUser} from '../services/users-service';

@Component({
  selector: 'user-form'
})
@View({
  templateUrl: './components/users/user-form/user-form.html?v=<%= VERSION %>',
  directives: [NgIf, FORM_DIRECTIVES]
})
export class UserForm {
  user: IUser;
  username: string = this.routeParams.params ? this.routeParams.params.username : undefined;
  constructor(@Inject(RouteParams) private routeParams,
              private usersService: UsersService) {
    if (this.username) {
      usersService.getUser(this.username)
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
    this.usersService.saveUser(model);
  }
}
