import {Directive, ElementRef} from 'angular2/angular2';

/**
 * Simple directive to add class active on a LI element when
 * it's A child element is clicked. Active class is removed
 * form all other LI element.
 * Follow the same principle as nav's in Bootstrap.
 *
 * @Example:
 * 	<ul set-active>
 * 		<li class="active">
 * 			<a href="a1">link 1</a>
 * 		</li>
 * 		<li>
 * 			<a href="a">link 2</a>
 * 		</li>
 * 	</ul>
 */
@Directive({
  selector: '[set-active]',
  host: { '(^click)': 'setActive($event)' }
})
export class SetActive {
  constructor(private element: ElementRef) {}
  setActive(evt): void {
    if (evt.target.tagName === 'A') {
      this.removeActiveClass();
      this.addActiveClass(evt.target.parentNode);
    }
  }
  private removeActiveClass(): void {
    let elements = this.element.nativeElement.getElementsByClassName('active');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('active');
    };
  }
  private addActiveClass(el: HTMLLIElement): void {
    el.classList.add('active');
  }
}
