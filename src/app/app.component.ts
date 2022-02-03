import { Component, OnInit } from '@angular/core';
import { fromEvent, iif, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'domload';

  choiceSub!: Subscription;
  documentLoad = fromEvent(document, 'DOMContentLoaded');
  choice = iif(
    () => !!this.documentLoad,
    of('document has load'),
    of('document was not loaded')
  );

  ngOnInit(){
     this.createStream(); 
  }

  createStream(){
    this.choiceSub = this.choice.pipe(
      ).subscribe((i)=> { console.log('result: ', i);
      }) 
  }

  ngOnDestroy(){
    this.choiceSub.unsubscribe();
  }


}
