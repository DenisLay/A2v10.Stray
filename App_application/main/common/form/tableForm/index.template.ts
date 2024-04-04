
let table: any;

class TemplateDesign {

    constructor() { }

    async onModelLoad() {

        document.querySelector('[test-id="TableForm__table"]').classList.add('customDataGrid');

        table = await window.createTable('customDataGrid');

        table.updateItems(this.Documents, ['Id', 'Date', 'Memo']);

        console.log(table);
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