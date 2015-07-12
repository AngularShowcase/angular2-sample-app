import {Directive, Component, View, ElementRef} from 'angular2/angular2';

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
  constructor(private _elRef: ElementRef) {}
  loading() {
    this._loading = true;
    this.toggleText();

    // Investigate if there is a better way to access Parent view.
    this._elRef.parentView._view.context[this._action]()
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
    this._text = v;
  }
  set action(v: string) {
    this._action = v;
  }
}
