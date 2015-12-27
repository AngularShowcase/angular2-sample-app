import {Directive, ElementRef, EventEmitter, Output, Input} from 'angular2/core';
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
  host: {
    '[disabled]': '_loading'
  }
})
export class LoadingBtn {
  @Input() public loadingText: string = 'Loading...';
  private _loading: boolean = false;
  private _originalText: string;
  @Output() private sampleCustomEvent = new EventEmitter();
  constructor(private _elRef: ElementRef) {
    this._originalText = this._elRef.nativeElement.innerText;
  }
  toggleText(): void {
    if (this._loading) {
      this._elRef.nativeElement.innerText = this.loadingText;
    } else {
      this._elRef.nativeElement.innerText = this._originalText;
    }
  }
  @Input('loadingMore') set loading(v: boolean) {
    this.sampleCustomEvent.emit(`Button is ${v ? '' : 'not '}loading.`);
    this._loading = v;
    this.toggleText();
  }
}
