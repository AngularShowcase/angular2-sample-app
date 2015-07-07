import {Inject, EventEmitter} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {IUser} from './interfaces';

export {IUser}

export class UsersService {
  private loaded = false;
  private loading = false;
  private loadUsers: Promise<Array<IUser>>;
  usersCache: Array<IUser>;
  selectedUser: IUser;

  constructor(@Inject(Http) private http: Http) {
    this.usersCache = [];
    this.loadUsers = new Promise((resolve, reject) => {
      this.http.get('./components/users/services/data.json')
        .toRx()
        .map(res => res.json().results)
        .map(res => res.map(o => o.user))
        .subscribe(res => {
          res.forEach(user => this.usersCache.push(user));
          /*this.loaded = true;
          this.loading = false;*/
          resolve(this.usersCache);
        });
    });
  }
  getUsers(): Promise<Array<IUser>> {
    /*if (this.loaded || this.loading) {
      return this.usersCache;
    } else {
      this.loading = true;
      // this.http.get('http://api.randomuser.me/?results=10')

      return this.usersCache;
    }*/
    return this.loadUsers;
  }
  getUser(username): Promise<IUser> {
    return this.findUserByUsername(username)
      .then(user => {
        this.selectedUser = user;
        return this.selectedUser;
      });
  }
  setSelectedUser(user: IUser): void {
    this.selectedUser = user;
  }
  getSelectedUser(username: string): IUser {
    return this.selectedUser;
  }
  private findUserByUsername(username): Promise<IUser> {
    /*return this.usersCache.filter(user => user.username === username)[0];*/
    return new Promise(resolve => {
      this.getUsers().then(users => {
        let user = users.filter(user => user.username === username)[0];
        resolve(user);
      });
    });
  }
}
