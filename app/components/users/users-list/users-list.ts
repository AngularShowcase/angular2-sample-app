import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {SetActive} from '../../../directives/set-active';

@Component({
  selector: 'users-list',
  properties: ['users']
})
@View({
  templateUrl: './components/users/users-list/users-list.html?v=<%= VERSION %>',
  directives: [RouterLink, NgFor, SetActive]
})
export class UsersList {}
