import {Inject} from 'angular2/angular2';
import {Http} from 'http/http';
import {IUser} from './interfaces';

const SEED_URL = 'http://api.randomuser.me/?results=10&seed=885ad8c4404e07ea03';
const URL = 'http://api.randomuser.me/?results=10';

export {IUser} from './interfaces';
export class UsersService {
  // Fetch only once and cache the initial collection.
  loadUsers = this.fetch(SEED_URL);
  usersCache = <Array<IUser>>[];
  loading = false;
  currentUser: IUser;
  constructor(@Inject(Http) private http: Http) {}
  getUsers(): Promise<Array<IUser>> {
    return this.loadUsers;
  }
  getMoreUsers(): Promise<Array<IUser>> {
    this.loading = true;
    return this.fetch(URL);
  }
  getUser(username): Promise<IUser> {
    return this.findUserByUsername(username)
      .then(user => {
        this.currentUser = user;
        return this.currentUser;
      });
  }
  saveUser(user: IUser) {
    this.usersCache.push(user);
    this.sort();
  }
  sort() {
    this.usersCache.sort((a,b) => a.name.last > b.name.last? 1 : -1);
  }
  private fetch(url: string): Promise<Array<IUser>> {
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .toRx()
        // Cleanup what is received from the API.
        .map(res => res.json().results)
        .map(res => res.map(o => o.user))
        .subscribe(res => {
          res.forEach(user => this.usersCache.push(user));
          this.sort();
          this.loading = false;
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
