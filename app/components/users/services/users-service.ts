import {Inject, EventEmitter} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {IUser} from './interfaces';

export {IUser}

export class UsersService {
  private loaded = false;
  private loading = false;
  usersCache: Array<IUser>;
  selectedUser: IUser;

  constructor(@Inject(Http) private http: Http) {
    this.usersCache = [];
  }

  getAll() {
    if (this.loaded || this.loading) {
      return this.usersCache;
    } else {
      this.loading = true;
      this.http.get('http://api.randomuser.me/?results=10')
        .toRx()
        .map(res => res.json().results)
        .map(res => res.map(o => o.user))
        .subscribe(res => {
          res.forEach(user => this.usersCache.push(user));
          this.loaded = true;
          this.loading = false;
        });

      return this.usersCache;
    }
  }

  setSelectedUser(user: IUser) {
    this.selectedUser = user;
  }

  getSelectedUser(): IUser {
    return this.selectedUser;
  }
}