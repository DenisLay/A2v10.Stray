
import Observer from "./observer";

export default class ButtonClickObserver extends Observer {
    constructor(source, action) {
        super();
        this.source = source;
        this.action = action;
    }

    update(value: any) {
        this.action(value);
    }
}