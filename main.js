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
};

const observableMulty = () => {
    let obs = Rx.Observable.from([1, 2, 3, 4]),
        sub = new Rx.Subject(),
        multicast = obs.multicast(sub);

    multicast.subscribe({
        next: console.log
    });

    multicast.subscribe({
        next: console.log
    });

    multicast.connect();
};

const behSubject = () => {
    let sub = new Rx.BehaviorSubject(0);

    sub.subscribe({
        next: console.log
    });

    sub.next(1);
    sub.next(3);

    sub.subscribe({
        next: (v) => console.log(`! - ${v}`)
    });

    sub.next(4);
};

const replaySub = () => {
    let sub = new Rx.ReplaySubject(3);

    sub.subscribe({
        next: console.log
    });

    sub.next(1);
    sub.next(2);
    sub.next(3);
    sub.next(4);

    sub.subscribe({
        next: (v) => console.log(`! - ${v}`)
    });

      sub.next(5);
};

const awecomeOp = (input) => {
    let out = Rx.Observable.create(function (obs) {
            input.subscribe({
                next: (v) => obs.next(`${v} is awesome`),
                error: (err) => obs.err(err),
                complete: () => obs.complete()
            });

        });
    return out;
};

const customOp = () => {
    let obs = Rx.Observable.from([1, 2, 3, 4]),
        newObs = awecomeOp(obs);

    newObs.subscribe(console.log);
}

document.addEventListener('DOMContentLoaded', () => {
    customOp();
});