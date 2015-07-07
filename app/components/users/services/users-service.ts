import {Inject, EventEmitter} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {IUser} from './interfaces';

export {IUser}

export class UsersService {
  private loadUsers: Promise<Array<IUser>>;
  usersCache: Array<IUser>;
  selectedUser: IUser;

  constructor(@Inject(Http) private http: Http) {
    this.usersCache = [];
    this.loadUsers = new Promise((resolve, reject) => {
      this.http.get('http://api.randomuser.me/?results=10&seed=885ad8c4404e07ea03')
        .toRx()
        .map(res => res.json().results)
        .map(res => res.map(o => o.user))
        .subscribe(res => {
          res.forEach(user => this.usersCache.push(user));
          resolve(this.usersCache);
        });
    });
  }
  getUsers(): Promise<Array<IUser>> {
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
  getSelectedUser(): IUser {
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
