
const eventBus: EventBus = require('std:eventBus');
//const createTable = require('common/component/table');

class TemplateDesign {

    constructor() { }

    async onModelLoad() {
        const root = this;
        const handler = (index) => {
            root.$$PageControllerIndex = index;
        }
        eventBus.$on('emit.PushNumbersRegister.setPageIndex', handler);

        if (window.createTable == null) {
            window.createTable = require('common/component/table');
        }
    }

    async onModelUnload() {
        //window.createTable = null;
    }

    build() {
        return {
            properties: {
                'TRoot.$$PageControllerIndex': Number,
                'TRoot.Table'() { return 'subdoc.PushNumbersDetails'; }
            },
            defaults: {
            },
            events: {
                "Model.load": this.onModelLoad,
                "Model.unload": this.onModelUnload,
            },
            commands: {
            }
        }
    }
}

const template = new TemplateDesign().build();

export default template;