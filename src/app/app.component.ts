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
  value = from([1,2,3,4]);

  ngOnInit() {
    this.createStream();
  }

  createStream() {
    this.choiceSub = from(this.getDOMLoadedState()).pipe(
      switchMapTo(this.value)
    ).subscribe((i) => {
      console.log('Value:',  i);
    });
  }

  getDOMLoadedState(): Observable<boolean> {
    const currentState = new BehaviorSubject(false);
    if (document.readyState == 'interactive' || document.readyState == 'complete') {
      currentState.next(true);
    } 

    return fromEvent(document, 'DOMContentLoaded').pipe(switchMapTo(currentState))
    
  }

  ngOnDestroy() {
    this.choiceSub.unsubscribe();
  }
}
