import type { INodeProperties } from "n8n-workflow";

export const noteOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["note"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a note",
        action: "Create a note",
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a note",
        action: "Delete a note",
      },
      {
        name: "Get",
        value: "get",
        description: "Get a note",
        action: "Get a note",
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many notes",
        action: "Get many notes",
      },
      {
        name: "Update",
        value: "update",
        description: "Update a note",
        action: "Update a note",
      },
    ],
    default: "create",
  },
];

export const noteFields: INodeProperties[] = [
  // Notebook getFolder
  // {
  // 	displayName: 'Folder Name or ID',
  // 	name: 'folderId',
  // 	description:
  // 		'ID of the folder to which the note belongs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
  // 	type: 'options',
  // 	typeOptions: {
  // 		loadOptionsMethod: 'getFolders',
  // 	},
  // 	required: true,
  // 	default: '',
  // 	displayOptions: {
  // 		show: {
  // 			resource: ['note'],
  // 			operation: ['create'],
  // 		},
  // 	},
  // },

  // Notebook selectFolder
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    // required: true,
    modes: [
      {
        //Select a notebook                             DF
        //displayName: 'From List',
        displayName: "From Notebook",
        name: "list",
        type: "list",
        placeholder: "Select a notebook...",
        typeOptions: {
          searchListMethod: "searchFolders",
          //searchListMethod: 'getFolders',
          //loadOptionsMethod: 'getFolders',
          searchFilterRequired: false,
          searchable: false,
        },
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        placeholder:
          "joplin://x-callback-url/openNote?id=e167983d038548ed96e680b23f5254f1",
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
        operation: ["create"],
        resource: ["note"],
      },
    },
    description: "Notebook ID",
  },
  // Note selectNote
  {
    displayName: "Note",
    name: "noteId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    modes: [
      {
        //Select a note                             DF
        //displayName: 'From List',
        displayName: "Note",
        name: "list",
        type: "list",
        placeholder: "Select a Note...",
        typeOptions: {
          searchListMethod: "searchNotes",
          // searchListMethod: 'searchNotebooks',
          searchFilterRequired: false,
          searchable: true,
        },
      },
      //by URL
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        placeholder:
          "joplin://x-callback-url/openNote?id=e167983d038548ed96e680b23f5254f1",
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
      //by ID
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
        operation: ["get", "delete", "update"],
        resource: ["note"],
      },
    },
    description: "The ID of the Note",
  },

  // ----------------------------------------
  //              note: create
  // ----------------------------------------

  {
    displayName: "Title",
    name: "title",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"],
      },
    },
  },

  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create", "update"],
      },
    },
    options: [
      {
        displayName: "Asignee Name or ID",
        name: "assigned_to",
        type: "options",
        typeOptions: {
          loadOptionsDependsOn: ["projectId"],
          loadOptionsMethod: "getUsers",
        },
        default: "",
        description:
          'ID of the user to whom the note is assigned. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
      },
      // {
      // 	displayName: 'Blocked Note',
      // 	name: 'blocked_note',
      // 	type: 'string',
      // 	default: '',
      // 	description: 'Reason why the note is blocked. Requires "Is Blocked" toggle to be enabled.',
      // },
      // Body
      {
        displayName: "Body",
        name: "body",
        type: "string",
        default: "",
        placeholder: "My note",
        description: "The note body, in Markdown. May also contain HTML.",
      },
      // Source
      {
        displayName: "Source URL",
        name: "source_url",
        type: "string",
        default: "",
        placeholder: "",
        description: "The full URL where the note comes from",
      },
      // Time
      {
        displayName: "Time",
        name: "time",
        placeholder: "",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false,
        },
        default: {
          set_time: {},
        },
        options: [
          {
            displayName: "Set_time",
            name: "set_time",
            values: [
              {
                displayName: "User_created_time",
                name: "user_created_time",
                type: "number",
                default: "",
                placeholder: "1679085845286",
                hint: "Epoch timestamp",
                // validation: [
                // 	{
                // 		type: 'regex',
                // 		properties: {
                // 			regex: '\d{10}(\.\d{1,9})?',
                // 			errorMessage: 'Not a valid Epoch timestamp',
                // 		},
                // 	},
                // ],
                description:
                  "When the note was created. It may differ from created_time as it can be manually set by the user.",
              },
              {
                displayName: "User_updated_time",
                name: "user_updated_time",
                type: "number",
                default: "",
                placeholder: "1679085845286",
                hint: "Epoch timestamp",
                description:
                  "When the note was last updated. It may differ from updated_time as it can be manually set by the user.",
              },
            ],
          },
        ],
      },
      // Body html
      {
        displayName: "Body_html",
        name: "body_html_pair",
        placeholder: "html",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false,
        },
        default: {
          batch: {},
        },
        options: [
          {
            displayName: "Batching",
            name: "batch",
            values: [
              {
                displayName: "Note Body, in HTML Format",
                name: "body_html",
                type: "string",
                default: "",
                description: "Body_html",
              },
              {
                displayName: "Base_url",
                name: "base_url",
                type: "string",
                default: "",
                placeholder: "",
                required: true,

                description: "Must exist to match API",
              },
            ],
          },
        ],
      },
      // Image
      {
        displayName: "Image",
        name: "image",
        placeholder: "html",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false,
        },
        default: {
          data: {},
        },
        options: [
          {
            displayName: "Image",
            name: "data",
            values: [
              {
                displayName: "Image_data_url",
                name: "image_data_url",
                type: "string",
                default: "",
                description:
                  "An image to attach to the note, in Data URL format",
              },

              {
                displayName: "Crop_rect",
                name: "crop_rect",
                type: "boolean",
                default: false,
                noDataExpression: true,
                description:
                  "Whether an image is provided, you can also specify an optional rectangle that will be used to crop the image",
              },

              {
                displayName: "Optional Rectangle",
                name: "crop",

                displayOptions: {
                  show: {
                    crop_rect: [true],
                  },
                },
                type: "fixedCollection",
                typeOptions: {
                  multipleValues: false,
                },
                default: {
                  frame: {},
                },
                options: [
                  {
                    displayName: "Frame1",
                    name: "frame",
                    values: [
                      {
                        displayName: "Frame x:",
                        name: "frame_x",
                        type: "number",
                        default: "",
                      },
                      {
                        displayName: "Frame y:",
                        name: "frame_y",
                        type: "number",
                        default: "",
                      },

                      {
                        displayName: "Frame width:",
                        name: "frame_width",
                        type: "number",
                        default: "",
                      },

                      {
                        displayName: "Frame height:",
                        name: "frame_height",
                        type: "number",
                        default: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // GPS
      {
        displayName: "GPS",
        name: "gps",
        placeholder: "Numerical",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false,
        },
        default: {
          var: {},
        },
        options: [
          {
            displayName: "Var",
            name: "var",
            values: [
              {
                displayName: "Latitude",
                name: "latitude",
                type: "number",
                default: "",
              },
              {
                displayName: "Longitude",
                name: "longitude",
                type: "number",
                default: "",
                placeholder: "",
              },
              {
                displayName: "Altitude",
                name: "altitude",
                type: "number",
                default: "",
              },
            ],
          },
        ],
      },
    ],
  },
];
