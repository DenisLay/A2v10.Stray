define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const eventBus = require('std:eventBus');
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
    class TemplateDesign {
        constructor() { }
        async onModelLoad() {
            subject.subscribe(new ButtonClickObserver(this, 'page-0', (value) => {
                eventBus.$emit('emit.PushNumbersRegister.setPageIndex', 0);
            }));
        }
        async makeClick(arg) {
            subject.notify({
                source: arg,
                value: {}
            });
        }
        build() {
            return {
                properties: {},
                defaults: {},
                events: {
                    "Model.load": this.onModelLoad,
                },
                commands: {
                    MakeClick: this.makeClick
                }
            };
        }
    }
    const template = new TemplateDesign().build();
    exports.default = template;
});
