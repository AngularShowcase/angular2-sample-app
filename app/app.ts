import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from 'angular2/router';
import {HTTP_BINDINGS} from 'http/http';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {NamesList} from './services/NameList';
import {Users, UsersService} from './components/users/users';

@Component({
  selector: 'app',
  viewBindings: [UsersService, NamesList]
})
@RouteConfig([
  { path: '/', redirectTo: '/home' },
  { path: '/home', component: Home, as: 'home' },
  { path: '/about', component: About, as: 'about' },
  { path: '/users/...', component: Users, as: 'users' }
])
@View({
  templateUrl: './app.html?v=<%= VERSION %>',
  styles: ['app { display: block }'],
  directives: [ROUTER_DIRECTIVES]
})
class App {}


bootstrap(App, [ROUTER_BINDINGS, HTTP_BINDINGS]);
