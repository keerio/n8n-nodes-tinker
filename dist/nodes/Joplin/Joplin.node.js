"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joplin = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
const descriptions_1 = require("./descriptions");
const JoplinApi = __importStar(require("joplin-api"));
class Joplin {
    constructor() {
        this.description = {
            displayName: 'Joplin',
            name: 'joplin',
            icon: 'file:joplin.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume Joplin API',
            defaults: {
                name: 'Joplin',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'jApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Folder',
                            value: 'folder',
                        },
                        {
                            name: 'Note',
                            value: 'note',
                        },
                        {
                            name: 'Tag',
                            value: 'tag',
                        },
                        {
                            name: 'Attach',
                            value: 'attach',
                        },
                    ],
                    default: 'folder',
                },
                ...descriptions_1.folderOperations,
                ...descriptions_1.folderFields,
                ...descriptions_1.noteOperations,
                ...descriptions_1.noteFields,
                ...descriptions_1.tagOperations,
                ...descriptions_1.tagFields,
            ],
        };
        this.methods = {
            loadOptions: {
                async getFolders() {
                    const credentials = await this.getCredentials('jApi');
                    JoplinApi.config.baseUrl = credentials.baseUrl;
                    JoplinApi.config.token = credentials.token;
                    const folders = await JoplinApi.folderApi.list();
                    console.log('folders method call', folders);
                    return folders.items.map(({ id, parent_id, title }) => ({ name: title, value: id, parentid: parent_id }));
                },
                async getTags() {
                    const credentials = await this.getCredentials('jApi');
                    JoplinApi.config.baseUrl = credentials.baseUrl;
                    JoplinApi.config.token = credentials.token;
                    const tags = await JoplinApi.tagApi.list();
                    console.log('getTags method call', tags);
                    return tags.items.map(({ id, title }) => ({ name: title, value: id }));
                },
            },
            listSearch: {
                async searchFolders() {
                    console.log('folders search before call');
                    const credentials = await this.getCredentials('jApi');
                    JoplinApi.config.baseUrl = credentials.baseUrl;
                    JoplinApi.config.token = credentials.token;
                    const res = await JoplinApi.folderApi.list();
                    console.log('folders search call', res);
                    return {
                        results: res.items.map((b) => ({
                            name: b.title,
                            value: b.id,
                            url: b.parent_id,
                        })),
                    };
                },
                async searchNotes() {
                    const credentials = await this.getCredentials('jApi');
                    JoplinApi.config.baseUrl = credentials.baseUrl;
                    JoplinApi.config.token = credentials.token;
                    console.log(JoplinApi.config.baseUrl);
                    console.log(JoplinApi.config.token);
                    const res = await JoplinApi.noteApi.list();
                    console.log(res);
                    return {
                        results: res.items.map((b) => ({
                            name: b.title,
                            value: b.id,
                            url: b.parent_id,
                        })),
                    };
                },
                async searchTags() {
                    console.log('Tags search init');
                    const credentials = await this.getCredentials('jApi');
                    JoplinApi.config.baseUrl = credentials.baseUrl;
                    JoplinApi.config.token = credentials.token;
                    const res = await JoplinApi.tagApi.list();
                    console.log('tags search call', res);
                    return {
                        results: res.items.map((b) => ({
                            name: b.title,
                            value: b.id,
                        })),
                    };
                },
            },
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        let responseData;
        const credentials = await this.getCredentials('jApi');
        JoplinApi.config.baseUrl = credentials.baseUrl;
        JoplinApi.config.token = credentials.token;
        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'folder') {
                    if (operation === 'create') {
                        const flattenedFields = (0, GenericFunctions_1.flattenObject)(this.getNodeParameter('additionalFields', i));
                        const filteredFields = (0, GenericFunctions_1.filterValidProperties)(flattenedFields);
                        const folderProperties = filteredFields;
                        folderProperties.title = this.getNodeParameter('name', i, undefined);
                        console.log('folderProperties', folderProperties);
                        const res = await JoplinApi.folderApi.create(folderProperties);
                        console.log('folder res', res);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                    else if (operation === 'delete') {
                        const folder_id = this.getNodeParameter('folder_id', i, undefined);
                        const res = await JoplinApi.folderApi.remove(folder_id);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                    else if (operation === 'get') {
                        const folder_id = this.getNodeParameter('folder_id', i, undefined);
                        responseData = await JoplinApi.folderApi.get(folder_id);
                        console.log('responseData', responseData);
                    }
                    else if (operation === 'update') {
                        const additionalFields = this.getNodeParameter('updateFields', i);
                        const flattenedFields = (0, GenericFunctions_1.flattenObject)(additionalFields);
                        const filteredFields = (0, GenericFunctions_1.filterValidProperties)(flattenedFields);
                        const folderProperties = filteredFields;
                        console.log('folderProperties', folderProperties);
                        const res = await JoplinApi.folderApi.update(folderProperties);
                        console.log('folder res', res);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                }
                else if (resource === 'note') {
                    if (operation === 'create') {
                        const flattenedFields = (0, GenericFunctions_1.flattenObject)(this.getNodeParameter('additionalFields', i));
                        const filteredFields = (0, GenericFunctions_1.filterValidProperties)(flattenedFields);
                        const noteProperties = filteredFields;
                        noteProperties.title = this.getNodeParameter('title', i, undefined);
                        const res = await JoplinApi.noteApi.create(noteProperties);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                    else if (operation === 'delete') {
                        const noteId = this.getNodeParameter('noteId.value', i, '', undefined);
                        await JoplinApi.noteApi.remove(noteId);
                        const item = items[0];
                        return [this.helpers.returnJsonArray(item)];
                    }
                    else if (operation === 'get') {
                        const noteId = this.getNodeParameter('noteId.value', i, '', undefined);
                        const res = await JoplinApi.noteApi.get(noteId);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                    else if (operation === 'update') {
                        const flattenedFields = (0, GenericFunctions_1.flattenObject)(this.getNodeParameter('additionalFields', i));
                        const filteredFields = (0, GenericFunctions_1.filterValidProperties)(flattenedFields);
                        const noteProperties = filteredFields;
                        noteProperties.id = this.getNodeParameter('noteId.value', i, '', undefined);
                        const res = await JoplinApi.noteApi.update(noteProperties);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                }
                else if (resource === 'tag') {
                    if (operation === 'create') {
                        const flattenedFields = (0, GenericFunctions_1.flattenObject)(this.getNodeParameter('title', i));
                        const filteredFields = (0, GenericFunctions_1.filterValidProperties)(flattenedFields);
                        const tagProperties = filteredFields;
                        console.log('tagProps', tagProperties);
                        const res = await JoplinApi.tagApi.create(tagProperties);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                    else if (operation === 'assign') {
                        const tagAssign = {};
                        tagAssign.tagId = this.getNodeParameter('tagId.value', i, '', undefined);
                        tagAssign.noteId = this.getNodeParameter('noteId.value', i, '', undefined);
                        console.log('tagID', tagAssign.tagId);
                        console.log('noteID', tagAssign.noteId);
                        const res = await JoplinApi.tagApi.addTagByNoteId(tagAssign.tagId, tagAssign.noteId);
                        const item = items[0];
                        item.json['res'] = res;
                        return [this.helpers.returnJsonArray(items)];
                    }
                    else if (operation === 'delete') {
                    }
                    else if (operation === 'get') {
                    }
                    else if (operation === 'update') {
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const executionErrorData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray({ error: error.message }), { itemData: { item: i } });
                    returnData.push(...executionErrorData);
                    continue;
                }
                throw error;
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.Joplin = Joplin;
//# sourceMappingURL=Joplin.node.js.map