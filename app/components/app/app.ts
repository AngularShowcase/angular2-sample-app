import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../services/name_list';
import {UsersCmp} from '../users/users';
import {UserService} from '../users/services/user_service';

@Component({
  selector: 'app',
  viewProviders: [NameList, UserService],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/home', component: HomeCmp, as: 'Home', useAsDefault: true },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/users/...', component: UsersCmp, as: 'Users' }
])
export class AppCmp {}

