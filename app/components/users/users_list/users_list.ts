import {Component, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {SetActive} from '../../../directives/set_active';

@Component({
  selector: 'users-list',
  properties: ['users'],
  templateUrl: './components/users/users_list/users_list.html',
  directives: [RouterLink, NgFor, SetActive]
})
export class UsersList {}
