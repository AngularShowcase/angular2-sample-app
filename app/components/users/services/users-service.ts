import {Inject, Http} from 'angular2/angular2';
import {IUser} from './interfaces';

export {IUser} from './interfaces';
export class UsersService {
  private _initialUsersURL = 'http://api.randomuser.me/?results=10&seed=885ad8c4404e07ea03';
  private _usersURL = 'http://api.randomuser.me/?results=10';
  loadUsers = this._loadUsers(this._initialUsersURL);
  usersCache = <Array<IUser>>[];
  selectedUser: IUser;
  constructor(@Inject(Http) private http: Http) {}
  getUsers(): Promise<Array<IUser>> {
    return this.loadUsers;
  }
  getMoreUsers(): Promise<Array<IUser>> {
    return this._loadUsers(this._usersURL);
  }
  getUser(username): Promise<IUser> {
    return this.findUserByUsername(username)
      .then(user => {
        this.selectedUser = user;
        return this.selectedUser;
      });
  }
  private _loadUsers(url: string): Promise<Array<IUser>> {
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .toRx()
        .map(res => res.json().results)
        .map(res => res.map(o => o.user))
        .subscribe(res => {
          res.forEach(user => this.usersCache.push(user));
          resolve(this.usersCache);
        });
    });
  }
  private findUserByUsername(username): Promise<IUser> {
    return new Promise(resolve => {
      this.getUsers().then(users => {
        let user = users.filter(user => user.username === username)[0];
        resolve(user);
      });
    });
  }
}
