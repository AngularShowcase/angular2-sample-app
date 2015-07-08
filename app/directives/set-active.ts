import {Directive, ElementRef, Inject} from 'angular2/angular2';
import {Router} from 'angular2/router';

/**
 * Simple directive to add class active on a LI element when
 * its A child element is clicked. Active class is removed
 * from all other LI element.
 * Follow the same principle as nav's in Bootstrap.
 *
 * @Example:
 * 	<ul>
 * 		<li class="active" set-active>
 * 			<a href="a1">link 1</a>
 * 		</li>
 * 		<li set-active>
 * 			<a href="a">link 2</a>
 * 		</li>
 * 	</ul>
 */
@Directive({
  selector: '[set-active]',
  host: { '(^click)': 'setActive($event)' }
})
export class SetActive {
  nativeElement: HTMLLIElement;
  parent: HTMLUListElement;
  mode: string
  constructor(private element: ElementRef, @Inject(Router) private router) {
    this.nativeElement = this.element.nativeElement;
    if (this.nativeElement.tagName !== 'LI') {
      throw new Error(`This directive only supports UL > LI list and must be
                      applied on LI element`);
    }
    this.parent = <HTMLUListElement>this.nativeElement.parentNode;

    // Reset as the view seems to be cached. Class active is still here
    // even after a re-instanciation of the component using this directive.
    this.removeActiveClass();

    this.onLoadSetActive();
  }
  setActive(evt): void {
    if (evt.target.tagName === 'A') {
      this.removeActiveClass();
      this.addActiveClass();
    }
  }
  onLoadSetActive() {
    // This is executed before the NgFor hence the timeout.
    // TODO: see if there is a better way.
    setTimeout(() => {
      let route = this.router.parent._currentInstruction.accumulatedUrl;
      let href = this.getHrefAttribute();
      if (route.match(href)) { this.addActiveClass(); }
    }, 0);
  }
  private removeActiveClass(): void {
    let elements = this.parent.getElementsByClassName('active');
    for (let i = 0; i < elements.length; i++) {
      (<HTMLLIElement>elements[i]).classList.remove('active');
    };
  }
  private addActiveClass(): void {
    this.nativeElement.classList.add('active');
  }
  private getHrefAttribute() {
    let anchorElement = <HTMLAnchorElement>this.nativeElement
      .getElementsByTagName('A')[0];
    return anchorElement.getAttribute('href');
  }
}
