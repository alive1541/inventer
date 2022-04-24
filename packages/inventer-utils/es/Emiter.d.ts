import { Observable, Subscriber } from 'rxjs';
export declare class Emiter<Topic extends number> {
    observers: Array<Array<Subscriber<any>>>;
    constructor();
    addObserver(topic: Topic, observer: Subscriber<any>): void;
    removeObserver(topic: Topic, observer: Subscriber<any>): void;
    on(topic: Topic | Topic[]): Observable<any>;
    emit(topic: Topic, data?: any): void;
}
