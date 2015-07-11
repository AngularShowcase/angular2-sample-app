import {
  Directive,
  ElementRef,
  Inject,
  Renderer,
  QueryList,
  Query
} from 'angular2/angular2';
import {Router, Location} from 'angular2/router';

/**
 * Simple directive to add class active on a LI element when
 * its A child element is clicked or on page load. Active class
 * is removed from all other LI element.
 * Follow the same principle as nav's in Bootstrap.
 *
 * @Example:
 * 	<ul set-active>
 * 		<li>
 * 			<a href="a1">link 1</a>
 * 		</li>
 * 		<li>
 * 			<a href="a">link 2</a>
 * 		</li>
 * 	</ul>
 */
@Directive({ selector: 'a' })
class Link {
  constructor (private _elRef: ElementRef) {}
  get href(): string {
    return this._elRef.nativeElement.getAttribute('href');
  }
}

@Directive({ selector: 'li' })
class ListItem {
  className = 'active';
  constructor(@Query(Link) public links: QueryList<Link>,
              @Inject(Location) public location: Location,
              private _elRef: ElementRef,
              private _renderer: Renderer) {}
  toggleClass() {
    if (this.linkHref === this.location.path()) {
      this._renderer.setElementClass(this._elRef, this.className, true);
    } else {
      this._renderer.setElementClass(this._elRef, this.className, false);
    }
  }
  get linkHref(): string {
    return this.links.first.href;
  }
}

@Directive({ selector: '[set-active]', host: { '(^click)': 'setActive()' } })
class List {
  _href;
  constructor(@Query(ListItem) private _items: QueryList<ListItem>,
              @Inject(Location) private location: Location,
              @Inject(Router) private _router: Router,
              private _elRef: ElementRef) {
    console.log(this._elRef);
    console.log(this._items);
    console.log(this.location.path());
    // _items is populated later on it's refers to child classes.
    // So we wait for changes.
    this._items.onChange(() => this.setActive());
  }
  setActive(): void {
    this._items._results.forEach(item => item.toggleClass())
  }
}

export var SetActive = [Link, ListItem, List];
