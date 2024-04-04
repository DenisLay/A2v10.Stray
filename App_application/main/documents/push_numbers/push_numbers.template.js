define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const http = require('std:http');
    async function createTable() {
        const _template = `
            <table class="data-grid">
                <colgroup>
                    <col v-for="head in header" class="">
                    <col class=fit>
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="head in header" class=" text-right">
                            <div class="h-holder">{{ head }}</div>
                        </th>
                        <th class=" text-right">
                            <div class="h-holder">Дії</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item._tId" class="dg-row even" @click="selectRow(item)" v-bind:class="{ 'active': item.isSelected }">
                        <td v-for="head in header" class="text-right no-wrap">
                            <span class="dg-cell">{{ item[head] }}</span>
                        </td>
                        <td class="text-right no-wrap">
                            <div class="commandbar visible-hover">
                                <button @click="edit(item)" class="btn btn-cb btn-icon"><i class="ico ico-edit"></i></button>
                                <button @click="remove(item)" class="btn btn-cb btn-icon"><i class="ico ico-delete"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
`;
        const table = new Vue({
            el: '.customDataGrid',
            template: _template,
            data() {
                return {
                    header: [],
                    items: []
                };
            },
            methods: {
                updateItems(documents, header = null) {
                    this.items = [];
                    let _tId = 0;
                    for (let i in documents) {
                        if (i < documents.length) {
                            const curDoc = documents[i];
                            if (header == null) {
                                this.header = [];
                                for (let head in curDoc._src_) {
                                    this.header.push(head);
                                }
                            }
                            else {
                                this.header = header;
                            }
                            let item = Object.assign({ _tId: _tId, isSelected: false }, documents[i]);
                            _tId++;
                            this.items.push(item);
                        }
                    }
                    console.log(this);
                },
                selectRow(document) {
                    this.items.forEach(doc => {
                        doc.isSelected = false;
                    });
                    document.isSelected = true;
                },
                edit(document) {
                    console.log(document._tId);
                },
                remove(document) {
                    console.log(document._tId);
                }
            }
        });
        return table;
    }
    let table;
    class TemplateDesign {
        constructor() { }
        async onModelLoad() {
            document.querySelector('[test-id="customDataGrid"]').classList.add('customDataGrid');
            table = await createTable();
            table.updateItems(this.Documents, ['Id', 'Date', 'Memo']);
        }
        async addItem() {
            console.log(this);
            this.Documents.$append({
                Id: 105,
                Date: Date.now(),
                Memo: 'sdfsd'
            });
            table.updateItems(this.Documents, ['Id', 'Date', 'Memo']);
        }
        build() {
            return {
                properties: {},
                defaults: {},
                events: {
                    "Model.load": this.onModelLoad,
                },
                commands: {
                    AddItem: this.addItem
                }
            };
        }
    }
    const template = new TemplateDesign().build();
    exports.default = template;
});
