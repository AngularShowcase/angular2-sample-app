import {Injectable, EventEmitter} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {IUser} from './interfaces';

const SEED_URL = 'http://api.randomuser.me/?results=10&seed=885ad8c4404e07ea03';
const URL = 'http://api.randomuser.me/?results=10';

export {IUser} from './interfaces';
@Injectable()
export class UserService {
  // Fetch only once and cache the initial collection.
  usersCache = <Array<IUser>>[];
  loading = false;
  currentUser: IUser;
  currentFetches = new Map<String, Promise<Array<IUser>>>();
  loadingStatus: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: Http) {}
  getUsers(): Promise<Array<IUser>> {
    if (this.usersCache.length) {
      return new Promise((resolve) => resolve(this.usersCache));
    } else {
      return this.fetch(SEED_URL);
    }
  }
  getMoreUsers(): Promise<Array<IUser>> {
    return this.fetch(URL);
  }
  getUser(username): Promise<IUser> {
    return this.findUserByUsername(username)
      .then(user => {
        this.currentUser = user;
        return this.currentUser;
      });
  }
  toggleState(force: boolean) {
    if (typeof force === 'undefined') {
      this.loading = !this.loading;
    } else {
      this.loading = force;
    }
    this.loadingStatus.emit(this.loading);
  }
  saveUser(user: IUser) {
    this.usersCache.push(user);
    this.sort();
  }
  sort() {
    this.usersCache.sort((a,b) => a.name.last > b.name.last? 1 : -1);
  }
  private fetch(url: string): Promise<Array<IUser>> {
    if (!this.currentFetches.has(url)) {
      let promise = new Promise((resolve, reject) => {
        this.toggleState(true);
        this.http.get(url)
        // .toRx()
        // Cleanup what is received from the API.
        .map(res => res.json().results)
        .map(res => res.map(o => o.user))
        .subscribe(res => {
          res.forEach(user => this.usersCache.push(user));
          this.sort();
          this.toggleState(false);
          this.currentFetches.delete(url);
          resolve(this.usersCache);
        });
      });
      this.currentFetches.set(url, promise);
    }
    return this.currentFetches.get(url);
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
