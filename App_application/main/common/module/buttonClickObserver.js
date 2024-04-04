define(["require", "exports", "./observer"], function (require, exports, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ButtonClickObserver extends observer_1.default {
        constructor(source, action) {
            super();
            this.source = source;
            this.action = action;
        }
        update(value) {
            this.action(value);
        }
    }
    exports.default = ButtonClickObserver;
});
