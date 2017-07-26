import * as Rx from 'rxjs/Rx';

const buttonEvents = () => {
    let button = document.querySelector('#btn');

    Rx.Observable.fromEvent(button, 'click')
        .throttleTime(1000)
        .map(e => e.clientX)
        .scan((count, clientX) => count + clientX, 0) // works as reduce
        .subscribe((count) => console.log(`clicked ${count}`));
};

const observable = () => {
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
};

const observableUnicast = () => {
    var obs = Rx.Observable.create((observer) => {
        let i = 0;

        setInterval(() => {
            observer.next(i++)
        }, 1000);
    });

    obs.subscribe({
        next: (value) => {
            console.log(`1 - ${value}`);
        }
    });

    setTimeout(() => {
        obs.subscribe({
            next: (value) => {
                console.log(`2 - ${value}`);
            }
        });
    }, 3000);
};

const subjectMulty = () => {
    var sub = new Rx.Subject(),
        i = 0;

    setInterval(() => {
        sub.next(i++);
    }, 1000);

    sub.subscribe({
        next: (value) => {
            console.log(`1 - ${value}`);
        }
    });

    setTimeout(() => {
        sub.subscribe({
            next: (value) => {
                console.log(`2 - ${value}`);
            }
        });
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    subjectMulty();
});