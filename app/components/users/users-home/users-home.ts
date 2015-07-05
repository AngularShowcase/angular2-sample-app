import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'users-home'
})
@View({
  templateUrl: './components/users/users-home/users-home.html?v=<%= VERSION %>'
})
export class UsersHome {}
