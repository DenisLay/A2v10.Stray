
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

const template: Template = {
	properties: {
		'TRoot.$$Tab': Number,
		'TRoot.$$Width'() { return '20%' }
	},
	defaults: {
	},
	validators: {
	},
	commands: {
		MakeButtonClick: makeButtonClick
	},
	delegates: {
	},
	events: {
		'Model.load': onModelLoad
	}
};

async function onModelLoad(this: IRoot, root: IRoot, caller?: IRoot) {
	subject.subscribe(new ButtonClickObserver(this, 'add-btn', (value) => {

		const lastItem = root.Rows[root.Rows.Count - 1];

		if (lastItem == undefined) {
			root.Rows.$append({});
		} else {
			root.Rows.$append({
				No: root.Rows[root.Rows.Count - 1].No + 1
			});
		}
	}));

	subject.subscribe(new ButtonClickObserver(this, 'apply', (value) => {
		root.$ctrl.$msg('Документ проведено.', 'PushNumbers', CommonStyle.info);
	}));
}

async function makeButtonClick(source) {
	subject.notify({
		source: source,
		value: {}
	});
}

export default template;
