import { of, fromEvent, Observable } from 'rxjs'; 
import { map, concatMap, catchError, tap, retry} from 'rxjs/operators';

console.clear();
const l = console.log;

// Errors

// Closing a stream

// const obs$ = new Observable(observer => {
//   l(observer.closed);    // false 
//   observer.next(1);      // emit 1
//   observer.error(new Error('Bad'));
//   l(observer.closed);    // true
//   observer.next(2);      // won't emit
// });

// obs$
//   .subscribe({
//     next: v => console.log(v),
//  // error: e => console.log(e.message)
//   });

// Catching an error

// const obs$ = new Observable(observer => {
//   observer.next(1);
//   observer.error(new Error('BANG!'));
// }).pipe(
//   catchError(err => {
//     l('Intercepted error:' + err);
//     return of('I got this');
//   })
// )

// obs$.subscribe(v => l(v));

// Handling errors in stream chains

const chanceDataObservable$ = new Observable(observer => {
  // observer.next(1)
  if(Math.random() < 0.5) {
    observer.error(new Error('something went wrong'))
  } else {
    observer.next(2);
    observer.complete();
  }
});

const button = document.querySelector('button');

fromEvent(button, 'click')
  .pipe(
    concatMap(() => 
      chanceDataObservable$
        .pipe(
          // catchError(() => of('An error to handle'))
          retry(3)
        )
        
    ),
    map(x => 'I got ' + x),
    // retry(3)
    // catchError(() => of('Handeled the error')),
    // tap(() => l('no errors past here'))
  )
  .subscribe(l);

