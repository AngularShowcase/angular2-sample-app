import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {SetActive} from '../../../directives/set_active';

@Component({
  selector: 'users-list',
  inputs: ['users'],
  templateUrl: './components/users/users_list/users_list.html',
  directives: [RouterLink, SetActive]
})
export class UsersListCmp {}
