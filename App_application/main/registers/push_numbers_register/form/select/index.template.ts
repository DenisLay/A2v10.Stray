
class TemplateDesign {

    constructor() { }

    async onModelLoad() {
                
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
            }
        }
    }
}

const template = new TemplateDesign().build();

export default template;