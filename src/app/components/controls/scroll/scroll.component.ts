import { Directive, Output, EventEmitter, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

@Directive({
  // tslint:disable-next-line:component-selector
selector: '[scroll]'
})
export class ScrollEventDirective implements OnDestroy {
  @Output() scrollPosition: EventEmitter<number> = new EventEmitter<number>
  ();

  private scrollEvent$: any;
  constructor(private el: ElementRef) {
    this.scrollEvent$ = Observable.fromEvent(this.el.nativeElement,
    'scroll').subscribe((e: any) => {
      this.scrollPosition.emit(e.target.scrollTop);
    });
  }

  ngOnDestroy() {
    this.scrollEvent$.unsubscribe();
  }
}
