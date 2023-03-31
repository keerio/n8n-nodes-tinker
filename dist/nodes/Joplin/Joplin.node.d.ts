import type { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription, INodeListSearchResult } from 'n8n-workflow';
export declare class Joplin implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getFolders(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
        listSearch: {
            searchFolders(this: ILoadOptionsFunctions): Promise<INodeListSearchResult>;
            searchNotes(this: ILoadOptionsFunctions): Promise<INodeListSearchResult>;
            searchTags(this: ILoadOptionsFunctions): Promise<INodeListSearchResult>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
