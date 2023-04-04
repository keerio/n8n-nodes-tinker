import type {
  IExecuteFunctions,
  // IDataObject,
  ILoadOptionsFunctions,
  INodeExecutionData,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
  INodeListSearchResult,
} from "n8n-workflow";

import {
  // toOptions,
  flattenObject,
  filterValidProperties,
} from "./GenericFunctions";

import {
  folderFields,
  folderOperations,
  noteFields,
  noteOperations,
  // taskFields,
  // taskOperations,
  tagFields,
  tagOperations,
} from "./descriptions";

import * as JoplinApi from "joplin-api";

export class Joplin implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Joplin",
    name: "joplin",
    icon: "file:joplin.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Consume Joplin API",
    defaults: {
      name: "Joplin",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "jApi",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Folder",
            value: "folder",
          },
          {
            name: "Note",
            value: "note",
          },
          {
            name: "Tag",
            value: "tag",
          },
          {
            name: "Attach",
            value: "attach",
          },
        ],
        default: "folder",
      },
      ...folderOperations,
      ...folderFields,
      ...noteOperations,
      ...noteFields,
      // ...taskOperations,
      // ...taskFields,
      ...tagOperations,
      ...tagFields,
    ],
  };
  methods = {
    loadOptions: {
      async getFolders(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        // Creds
        const credentials = await this.getCredentials("jApi");
        JoplinApi.config.baseUrl = credentials.baseUrl as string;
        JoplinApi.config.token = credentials.token as string;

        const folders = await JoplinApi.folderApi.list();

        console.log("folders method call", folders);

        return folders.items.map(({ id, parent_id, title }) => ({
          name: title,
          value: id,
          parentid: parent_id,
        }));
      },
      async getTags(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        // Creds
        const credentials = await this.getCredentials("jApi");
        JoplinApi.config.baseUrl = credentials.baseUrl as string;
        JoplinApi.config.token = credentials.token as string;

        const tags = await JoplinApi.tagApi.list();

        console.log("getTags method call", tags);

        return tags.items.map(({ id, title }) => ({ name: title, value: id }));
      },
    },
    listSearch: {
      async searchFolders(
        this: ILoadOptionsFunctions
      ): Promise<INodeListSearchResult> {
        // Creds
        console.log("folders search before call");

        const credentials = await this.getCredentials("jApi");
        JoplinApi.config.baseUrl = credentials.baseUrl as string;
        JoplinApi.config.token = credentials.token as string;
        // Search
        const res = await JoplinApi.folderApi.list();
        console.log("folders search call", res);

        return {
          results: res.items.map((b: JoplinApi.FolderListRes) => ({
            name: b.title,
            value: b.id,
            url: b.parent_id,
          })),
        };
      },
      async searchNotes(
        this: ILoadOptionsFunctions
      ): Promise<INodeListSearchResult> {
        const credentials = await this.getCredentials("jApi");
        JoplinApi.config.baseUrl = credentials.baseUrl as string;
        JoplinApi.config.token = credentials.token as string;

        console.log(JoplinApi.config.baseUrl);
        console.log(JoplinApi.config.token);

        const res = await JoplinApi.noteApi.list();
        console.log(res);

        return {
          results: res.items.map((b: JoplinApi.NoteGetRes) => ({
            name: b.title,
            value: b.id,
            url: b.parent_id,
          })),
        };
      },
      async searchTags(
        this: ILoadOptionsFunctions
      ): Promise<INodeListSearchResult> {
        // Creds
        console.log("Tags search init");

        const credentials = await this.getCredentials("jApi");
        JoplinApi.config.baseUrl = credentials.baseUrl as string;
        JoplinApi.config.token = credentials.token as string;
        // Search
        const res = await JoplinApi.tagApi.list();
        console.log("tags search call", res);

        return {
          results: res.items.map((b: JoplinApi.TagGetRes) => ({
            name: b.title,
            value: b.id,
          })),
        };
      },
    },
  };

  // workers
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter("resource", 0) as Resource;
    const operation = this.getNodeParameter("operation", 0) as Operation;

    let responseData;

    const credentials = await this.getCredentials("jApi");
    JoplinApi.config.baseUrl = credentials.baseUrl as string;
    JoplinApi.config.token = credentials.token as string;

    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "folder") {
          // **********************************************************************
          //                                  folder
          // **********************************************************************

          if (operation === "create") {
            // ----------------------------------------
            //               folder: create
            // ----------------------------------------

            const flattenedFields = flattenObject(
              this.getNodeParameter("additionalFields", i)
            );
            const filteredFields = filterValidProperties(flattenedFields);
            const folderProperties: JoplinApi.FolderProperties = filteredFields;

            // Inject required field message ID into payload
            folderProperties.title = this.getNodeParameter(
              "name",
              i,
              undefined
            ) as string;

            console.log("folderProperties", folderProperties);

            // Call Joplin-api
            const res = await JoplinApi.folderApi.create(folderProperties);

            console.log("folder res", res);

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          } else if (operation === "delete") {
            // ----------------------------------------
            //               folder: delete
            // ----------------------------------------

            const folder_id = this.getNodeParameter(
              "folder_id",
              i,
              undefined
            ) as string;

            // Call Joplin-api
            const res = await JoplinApi.folderApi.remove(folder_id);

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          } else if (operation === "get") {
            // ----------------------------------------
            //                folder: get
            // ----------------------------------------

            const folder_id = this.getNodeParameter(
              "folder_id",
              i,
              undefined
            ) as string;

            responseData = await JoplinApi.folderApi.get(folder_id);
            console.log("responseData", responseData);
          } else if (operation === "update") {
            // ----------------------------------------
            //               folder: update
            // ----------------------------------------

            // Use the utility functions to flatten and filter the additionalFields object
            const additionalFields = this.getNodeParameter("updateFields", i);
            const flattenedFields = flattenObject(additionalFields);
            const filteredFields = filterValidProperties(flattenedFields);

            // Create an instance of the NoteProperties class using the filtered object
            const folderProperties: JoplinApi.FolderProperties = filteredFields;

            console.log("folderProperties", folderProperties);

            // Call Joplin-api
            const res = await JoplinApi.folderApi.update(folderProperties);

            console.log("folder res", res);

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          }
        } else if (resource === "note") {
          // **********************************************************************
          //                                 note
          // **********************************************************************

          if (operation === "create") {
            // ----------------------------------------
            //              note: create
            // ----------------------------------------

            const flattenedFields = flattenObject(
              this.getNodeParameter("additionalFields", i)
            );
            const filteredFields = filterValidProperties(flattenedFields);

            const noteProperties: JoplinApi.NoteProperties = filteredFields;

            // Inject required field message ID into payload
            noteProperties.title = this.getNodeParameter(
              "title",
              i,
              undefined
            ) as string;

            // Call Joplin-api
            const res = await JoplinApi.noteApi.create(noteProperties);

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          } else if (operation === "delete") {
            // ----------------------------------------
            //              note: delete
            // ----------------------------------------
            const noteId = this.getNodeParameter(
              "noteId.value",
              i,
              "",
              undefined
            ) as string;

            // Call Joplin-api
            await JoplinApi.noteApi.remove(noteId);

            const item = items[0];

            return [this.helpers.returnJsonArray(item)];
          } else if (operation === "get") {
            // ----------------------------------------
            //                note: get
            // ----------------------------------------

            const noteId = this.getNodeParameter(
              "noteId.value",
              i,
              "",
              undefined
            ) as string;

            // Call Joplin-api
            const res = await JoplinApi.noteApi.get(noteId);
            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          } else if (operation === "update") {
            // ----------------------------------------
            //              note: update
            // ----------------------------------------

            const flattenedFields = flattenObject(
              this.getNodeParameter("additionalFields", i)
            );
            const filteredFields = filterValidProperties(flattenedFields);

            // Create an instance of the NoteProperties class using the filtered object
            const noteProperties: JoplinApi.NoteProperties = filteredFields;

            // Inject required field message ID into payload

            noteProperties.id = this.getNodeParameter(
              "noteId.value",
              i,
              "",
              undefined
            ) as string;

            // Call Joplin-api
            const res = await JoplinApi.noteApi.update(noteProperties);

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          }
        } else if (resource === "tag") {
          // **********************************************************************
          //                               tag
          // **********************************************************************

          if (operation === "create") {
            // ----------------------------------------
            //            tag: create
            // ----------------------------------------

            const flattenedFields = flattenObject(
              this.getNodeParameter("title", i)
            );
            const filteredFields = filterValidProperties(flattenedFields);
            const tagProperties: JoplinApi.TagProperties = filteredFields;
            console.log("tagProps", tagProperties);

            // Call Joplin-api
            const res = await JoplinApi.tagApi.create(tagProperties);

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          } else if (operation === "assign") {
            // ----------------------------------------
            //            tag: assign
            // ----------------------------------------

            const tagAssign: Record<string, any> = {};
            tagAssign.tagId = this.getNodeParameter(
              "tagId.value",
              i,
              "",
              undefined
            ) as string;
            tagAssign.noteId = this.getNodeParameter(
              "noteId.value",
              i,
              "",
              undefined
            ) as string;

            console.log("tagID", tagAssign.tagId);
            console.log("noteID", tagAssign.noteId);

            // Call Joplin-api
            const res = await JoplinApi.tagApi.addTagByNoteId(
              tagAssign.tagId,
              tagAssign.noteId
            );

            const item = items[0];
            item.json["res"] = res;

            return [this.helpers.returnJsonArray(items)];
          } else if (operation === "delete") {
            // ----------------------------------------
            //            tag: delete
            // ----------------------------------------
          } else if (operation === "get") {
            // ----------------------------------------
            //              tag: get
            // ----------------------------------------
          } else if (operation === "update") {
            // ----------------------------------------
            //            tag: update
            // ----------------------------------------
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }

        throw error;
      }
    }

    return this.prepareOutputData(returnData);
  }
}
