import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'users-home'
})
@View({
  templateUrl: './components/users/user-home/user-home.html?v=<%= VERSION %>'
})
export class UsersHome {}
