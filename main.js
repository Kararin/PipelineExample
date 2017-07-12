import * as Rx from 'rxjs/Rx';

const buttonEvents = () => {
    let button = document.querySelector('#btn');

    Rx.Observable.fromEvent(button, 'click')
        .throttleTime(1000)
        .map(e => e.clientX)
        .scan((count, clientX) => count + clientX, 0) // works as reduce
        .subscribe((count) => console.log(`clicked ${count}`));
}

document.addEventListener('DOMContentLoaded', () => {
    let observable = Rx.Observable.create((observer) => {
            let id = setInterval(() => {
                observer.next(4);
            }, 1000);

            return () => {
                console.log('cleared');
                clearInterval(id);
            }
        }),
        subscription;

    console.log('before subscribe');
    subscription = observable.subscribe({
        next: console.log,
        error: err => console.log(`${err}`),
        complete: () => console.log('done')
    });
    console.log('after subscribe');

    setTimeout(() => {
        console.log('un');
        subscription.unsubscribe();
    }, 3000);
});