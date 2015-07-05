import {Directive, ElementRef} from 'angular2/angular2';

/**
 * Simple directive to add class active on a LI element when
 * its A child element is clicked. Active class is removed
 * from all other LI element.
 * Follow the same principle as nav's in Bootstrap.
 *
 * TODO: Add onload set-active (childs routes need to fully work for that).
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
  host: { '(^click)': 'setActive($event)' },
  properties: ['mode: set-active']
})
export class SetActive {
  nativeElement: HTMLLIElement;
  parent: HTMLUListElement;
  mode: string
  constructor(private element: ElementRef) {
    this.nativeElement = this.element.nativeElement;
    if (this.nativeElement.tagName !== 'LI') {
      throw new Error(`This directive only supports UL > LI list and must
                      applied on LI element`);
    }
    this.parent = <HTMLUListElement>this.nativeElement.parentNode;

    // Will be used to check A element href attribute against browser
    // location strictly or partially. Default to strict.
    // To be implemented.
    this.mode = this.mode || 'strict';

    // Reset as the view seems to be cached. Class active is still here
    // even after a re-instanciation of the component using this directive.
    this.removeActiveClass();
  }
  setActive(evt): void {
    if (evt.target.tagName === 'A') {
      this.removeActiveClass();
      this.addActiveClass();
    }
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
}
