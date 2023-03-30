import type { INodeProperties } from 'n8n-workflow';

export const folderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['folder'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a folder',
				action: 'Create a folder',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a folder',
				action: 'Delete a folder',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a folder',
				action: 'Get a folder',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a folder',
				action: 'Update a folder',
			},
		],
		default: 'create',
	},
];

export const folderFields: INodeProperties[] = [
	// ----------------------------------------
	//               folder: create
	// ----------------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['create'],
			},
		},
		options: [
			// Folder parent_id
			{
				displayName: 'New Folder Parent Name or ID',
				name: 'parent_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getFolders',
				},
				default: '',
				description: 'ID of the parent folder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},

			{
				displayName: 'Time',
				name: 'time',
				placeholder: '',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: {
					 set_time: {},
				},
				options: [
					{
						displayName: 'Set_time',
						name: 'set_time',
						values: [
							{
								displayName: 'User_created_time',
								name: 'user_created_time',
								type: 'number',
								default: '',
								placeholder: '1679085845286',
								hint:'Epoch timestamp',
								description:
									'When the folder was created. It may differ from created_time as it can be manually set by the user.',
							},
							{
								displayName: 'User_updated_time',
								name: 'user_updated_time',
								type: 'number',
								default: '',
								placeholder: '1679085845286',
								hint:'Epoch timestamp',
								description:
									'When the folder was last updated. It may differ from updated_time as it can be manually set by the user.',
							},

						],
					},
				],
			},
		],
	},

	// ----------------------------------------
	//               folder: delete
	// ----------------------------------------
	{
		displayName: 'Folder Name or ID',
		name: 'folder_id',
		description: 'ID of the folder to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		//type: 'string',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getFolders',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------------
	//                folder: get
	// ----------------------------------------
	{
		displayName: 'Folder Name or ID',
		name: 'folder_id',
		description: 'ID of the folder to retrieve. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		//type: 'string',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getFolders',
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------------
	//               folder: update
	// ----------------------------------------
	{
		displayName: 'Folder Name or ID',
		name: 'folderId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getFolders',
		},
		default: '',
		description: 'ID of the folder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['update'],
			},
		},
	},
	// {
	// 	displayName: 'Folder ID',
	// 	name: 'folderId',
	// 	description: 'ID of the folder to update',
	// 	type: 'string',
	// 	required: true,
	// 	default: '',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['folder'],
	// 			operation: ['update'],
	// 		},
	// 	},
	// },
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Folder title',
			},
			{
				displayName: 'Parent Name or ID',
				name: 'parent_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getFolders',
					// loadOptionsDependsOn: ['update']
				},
				default: '',
				description: 'Folder title. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'User_created_time',
				name: 'assigned_to',
				type: 'options',
				typeOptions: {
					loadOptionsDependsOn: ['project_id'],
				//	loadOptionsMethod: 'getUsers',
				},
				default: '',
				description:
					'ID of the user to whom the folder is assigned. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'User_updated_time',
				name: 'user_updated_time',
				type: 'number',
				default: '',
				description: 'Reason why the folder is blocked. Requires "Is Blocked" toggle to be enabled.',
			},
		],
	},
];
