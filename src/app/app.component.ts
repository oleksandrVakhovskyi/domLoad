import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, iif,merge,  Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { map, mergeAll, switchMap,  switchMapTo,  takeUntil,  takeWhile,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'domload';

  choiceSub!: Subscription;
  documentLoad = fromEvent(document, 'DOMContentLoaded');

  ngOnInit() {
     
   
    this.createStream();
  }

  createStream(){
    this.getDOMLoadedState()
      .subscribe((i) => {
        console.log(i);
      });
  }

  getDOMLoadedState(): Observable<boolean> {
    const currentState = new BehaviorSubject(false);
    if (document.readyState == 'interactive' ) {
      currentState.next(true);
    }
    else { 
      
      currentState.next(false);
    }
  
    return fromEvent(document, 'DOMContentLoaded').pipe(switchMapTo(currentState));
      
  }

  ngOnDestroy() {
    // this.choiceSub.unsubscribe();
  }
}
