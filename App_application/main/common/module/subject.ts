
import Observer from "./observer";
export default class Subject {
    private observers: Observer[] = [];

    subscribe(observer: Observer) {
        this.observers.push(observer);
    }

    notify(params: { source: string, value: any }) {
        for (const observer of this.observers) {
            if (observer.source == params.source) {
                observer.update(params.value);
            }
        }
    }
}