import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {NameList} from '../../services/name_list';

@Component({
  selector: 'about',
  styles: [
    `
      ul li a {
        color:blue;
        cursor:pointer;
      }
    `
  ],
  templateUrl: './components/about/about.html',
  directives: [NgFor]
})
export class AboutCmp {
  constructor(public list: NameList) {}
  addName(newname): boolean {
    this.list.add(newname.value);
    newname.value = '';
    // prevent default form submit behavior to refresh the page
    return false;
  }
}
