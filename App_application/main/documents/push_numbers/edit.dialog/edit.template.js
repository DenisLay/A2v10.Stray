define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Observer {
        update(value) {
        }
    }
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
    class ButtonClickObserver extends Observer {
        constructor(root, source, action) {
            super();
            this.source = source;
            this.action = action;
            this.root = root;
        }
        update(value) {
            this.action(value);
        }
    }
    const subject = new Subject();
    const template = {
        properties: {
            'TRoot.$$Tab': Number,
            'TRoot.$$Width'() { return '20%'; }
        },
        defaults: {},
        validators: {},
        commands: {
            MakeButtonClick: makeButtonClick
        },
        delegates: {},
        events: {
            'Model.load': onModelLoad
        }
    };
    async function onModelLoad(root, caller) {
        subject.subscribe(new ButtonClickObserver(this, 'add-btn', (value) => {
            const lastItem = root.Rows[root.Rows.Count - 1];
            if (lastItem == undefined) {
                root.Rows.$append({});
            }
            else {
                root.Rows.$append({
                    No: root.Rows[root.Rows.Count - 1].No + 1
                });
            }
        }));
        subject.subscribe(new ButtonClickObserver(this, 'apply', (value) => {
            root.$ctrl.$msg('Документ проведено.', 'PushNumbers', "info");
        }));
    }
    async function makeButtonClick(source) {
        subject.notify({
            source: source,
            value: {}
        });
    }
    exports.default = template;
});
