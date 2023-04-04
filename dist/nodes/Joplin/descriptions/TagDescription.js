"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFields = exports.tagOperations = void 0;
exports.tagOperations = [
    {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["tag"],
            },
        },
        options: [
            {
                name: "Assign",
                value: "assign",
                description: "Assign a tag",
                action: "Assign a tag",
            },
        ],
        default: "assign",
    },
];
exports.tagFields = [
    {
        displayName: "New Tag",
        name: "title",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                resource: ["tag"],
                operation: ["create"],
            },
        },
    },
    {
        displayName: "Note",
        name: "noteId",
        type: "resourceLocator",
        default: { mode: "list", value: "" },
        required: true,
        modes: [
            {
                displayName: "Note",
                name: "list",
                type: "list",
                placeholder: "Select a Note...",
                typeOptions: {
                    searchListMethod: "searchNotes",
                    searchFilterRequired: false,
                    searchable: true,
                },
            },
            {
                displayName: "By URL",
                name: "url",
                type: "string",
                placeholder: "joplin://x-callback-url/openNote?id=e167983d038548ed96e680b23f5254f1",
                validation: [
                    {
                        type: "regex",
                        properties: {
                            regex: "joplin://x-callback-url/openNote?id=[A-Za-z0-9]{32}",
                            errorMessage: "Not a valid Joplin note URL",
                        },
                    },
                ],
                extractValue: {
                    type: "regex",
                    regex: "[A-Za-z0-9]{32}",
                },
            },
            {
                displayName: "ID",
                name: "id",
                type: "string",
                validation: [
                    {
                        type: "regex",
                        properties: {
                            regex: "[A-Za-z0-9]{32}",
                            errorMessage: "Not a valid Joplin Note ID",
                        },
                    },
                ],
                placeholder: "e167983d038548ed96e680b23f5254f1",
                url: "=joplin://x-callback-url/openNote?id={{$value}}",
            },
        ],
        displayOptions: {
            show: {
                operation: ["assign", "update", "unassign"],
                resource: ["tag"],
            },
        },
        description: "The ID of the Note",
    },
    {
        displayName: "Tag",
        name: "tagId",
        type: "resourceLocator",
        default: { mode: "list", value: "" },
        required: true,
        modes: [
            {
                displayName: "Tag",
                name: "list",
                type: "list",
                placeholder: "Select a Tag...",
                typeOptions: {
                    searchListMethod: "searchTags",
                    searchFilterRequired: false,
                    searchable: true,
                },
            },
        ],
        displayOptions: {
            show: {
                operation: ["assign", "update", "unassign"],
                resource: ["tag"],
            },
        },
        description: "The ID of the Note",
    },
];
//# sourceMappingURL=TagDescription.js.map