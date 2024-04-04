define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TemplateDesign {
        constructor() { }
        async onModelLoad() {
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
