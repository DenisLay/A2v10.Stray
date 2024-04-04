define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { createTable } = require('common/component/table');
    let table;
    class TemplateDesign {
        constructor() { }
        async onModelLoad() {
            document.querySelector('[test-id="TableForm__table"]').classList.add('customDataGrid');
            table = await createTable('customDataGrid');
            table.updateItems([], ['Id', 'Date', 'Memo']);
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
