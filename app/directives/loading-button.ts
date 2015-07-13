import {Directive, Component, View, ElementRef} from 'angular2/angular2';
/**
 * Simple directive to display an action message in a button when clicked.
 * The button is then disabled until the action is completed.
 * The action function must return a Promise and be a method of the parent
 * element.
 *
 * @Example:
 *  <button loading loading-text="loading" loading-action="methodName">
 *  	Call my action
 *  </button>
 */
@Directive({
  selector: 'button[loading]',
  properties: ['text: loadingText', 'action: loadingAction'],
  host: { '(click)': 'loading()', '[disabled]': '_loading' }
})
export class LoadingButton {
  private _text: string;
  private _action: string;
  private _originalText = this._elRef.nativeElement.innerHTML;
  private _loading = false;
  // TODO: Investigate if there is a better way to access Parent view.
  private _parent = this._elRef.parentView._view.context;
  constructor(private _elRef: ElementRef) {}
  loading() {
    this._loading = true;
    this.toggleText();

    if (!(this._action in this._parent) &&
        typeof this._parent[this._action] !== 'function') {
      throw new Error('Parent element has no method `' + this._action + '`');
    }
    this._parent[this._action]()
      .then(() => this._loading = false)
      .then(() => this.toggleText());
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
  set action(v: string) {
    this._action = v;
  }
}
