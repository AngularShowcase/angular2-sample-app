import {Component, bind, bootstrap, ViewEncapsulation} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_BINDINGS,
  ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {NameList} from './services/name_list';
import {Users} from './components/users/users';
import {UserService} from './components/users/services/user_service';

@Component({
  selector: 'app',
  viewBindings: [NameList, UserService],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', redirectTo: '/home' },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/about', component: About, as: 'About' },
  { path: '/users/...', component: Users, as: 'Users' }
])
class App {}


bootstrap(App, [
  ROUTER_BINDINGS,
  bind(ROUTER_PRIMARY_COMPONENT).toValue(App),
  HTTP_BINDINGS
]);
