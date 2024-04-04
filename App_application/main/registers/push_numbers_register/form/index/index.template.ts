
const eventBus: EventBus = require('std:eventBus');

class Observer {

	public source: string;

	public action: ((value: any) => {})

	public root: IRoot;

	update(value: any) {

	}
}

class Subject {
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

class ButtonClickObserver extends Observer {
	constructor(root, source, action) {
		super();
		this.source = source;
		this.action = action;
		this.root = root;
	}

	update(value: any) {
		this.action(value);
	}
}

const subject = new Subject();

class TemplateDesign {

    constructor() { }

	async onModelLoad() {

		subject.subscribe(new ButtonClickObserver(this, 'page-1', (value) => {
			eventBus.$emit('emit.PushNumbersRegister.setPageIndex', 1);
		}))
                
    }

	async makeClick(arg) {
		subject.notify({
			source: arg,
			value: {}
		});
	}

    build() {
        return {
            properties: {
                
            },
            defaults: {
            },
            events: {
                "Model.load": this.onModelLoad,
            },
			commands: {
				MakeClick: this.makeClick
            }
        }
    }
}

const template = new TemplateDesign().build();

export default template;