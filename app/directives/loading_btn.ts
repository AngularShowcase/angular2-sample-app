import {Directive, ElementRef, EventEmitter} from 'angular2/angular2';
/**
 * Simple directive to display an action message (via [loading-text] property) in a button when clicked.
 * The button is then disabled until the action is completed.
 * It handles state via the [loading-more] property.
 * Shows how an example of how to emit custom events (sample-custom-event) with a value.
 *
 * @Example:
 *  <button type="button" 
 *    loading 
 *    [loading-text]="'Loading more...'" 
 *    [loading-more]="any-binding" 
 *    (sample-custom-event)="eventHandler($event)"
 *    (click)="anyAction()">
 *  	  Call my action
 *  </button>
 */
@Directive({
  selector: 'button[loading-btn]',
  properties: [
    'text: loadingText',
    'loading: loadingMore'
  ],
  events: [
    'sampleCustomEvent'
  ],
  host: {
    '[disabled]': '_loading'
  }
})
export class LoadingBtn {
  public _loading = false;
  private _text: string;
  private _originalText: string;
  private sampleCustomEvent = new EventEmitter();
  constructor(private _elRef: ElementRef) {
    this._originalText = this._elRef.nativeElement.innerHTML;
  }
  toggleText(): void {
    if (this._loading) {
      this._elRef.nativeElement.innerHTML = this._text;
    } else {
      this._elRef.nativeElement.innerHTML = this._originalText;
    }
  }
  set text(v: string) {
    if (!v) { v = 'default text'; }
    this._text = v;
  }
  set loading(v: boolean) {
    this.sampleCustomEvent.next(`Button is ${v ? '' : 'not '}loading.`);
    this._loading = v;
    this.toggleText();
  }
}
