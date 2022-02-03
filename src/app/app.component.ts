import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  from,
  fromEvent,
  iif,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subscription,
} from 'rxjs';
import {
  filter,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  switchMapTo,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'domload';

  choiceSub!: Subscription;
  documentLoad = fromEvent(document, 'DOMContentLoaded');
  value = from([1,2,3,4])
  ngOnInit() {
    this.createStream();
  }

  createStream() {
    this.choiceSub = from(this.getDOMLoadedState()).pipe(
      filter(val => val === true),
      switchMapTo(this.value)
    ).subscribe((i) => {
      console.log(i);
    });
  }

  getDOMLoadedState(): Observable<boolean> {
    const currentState = new BehaviorSubject(false);
    if (document.readyState == 'interactive') {
      currentState.next(true);
    } else {
      currentState.next(false);
    }

    return fromEvent(document, 'DOMContentLoaded').pipe(
      switchMapTo(currentState)
    );
  }

  ngOnDestroy() {
    this.choiceSub.unsubscribe();
  }
}
