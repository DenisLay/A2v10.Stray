define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let table;
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
                properties: {},
                defaults: {},
                events: {
                    "Model.load": this.onModelLoad,
                },
                commands: {}
            };
        }
    }
    const template = new TemplateDesign().build();
    exports.default = template;
});
