define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Subject {
        constructor() {
            this.observers = [];
        }
        subscribe(observer) {
            this.observers.push(observer);
        }
        notify(params) {
            for (const observer of this.observers) {
                if (observer.source == params.source) {
                    observer.update(params.value);
                }
            }
        }
    }
    exports.default = Subject;
});
