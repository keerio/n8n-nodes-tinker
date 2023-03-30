import type { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			// {
			// 	name: 'Create',
			// 	value: 'create',
			// 	description: 'Create a tag',
			// 	action: 'Create a tag',
			// },
			{
				name: 'Assign',
				value: 'assign',
				description: 'Assign a tag',
				action: 'Assign a tag',
			},
			// {
			// 	name: 'Update',
			// 	value: 'update',
			// 	description: 'Update a tag',
			// 	action: 'Update a tag',
			// },
			// {
			// 	name: 'Unassign',
			// 	value: 'unassign',
			// 	description: 'Update a tag',
			// 	action: 'Update a tag',
			// },
		],
		default: 'assign',
	},
];

export const tagFields: INodeProperties[] = [
	// ----------------------------------------
	//               tag: create
	// ----------------------------------------
	{
		displayName: 'New Tag',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create'],
			},
		},
	},
	// ----------------------------------------
	//               tag: assign
	// ----------------------------------------

	// Select a Note
	{
		displayName: 'Note',
		name: 'noteId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		modes: [
			{

				//Select a note                             DF
				//displayName: 'From List',
				displayName: 'Note',
				name: 'list',
				type: 'list',
				placeholder: 'Select a Note...',
				typeOptions: {
					searchListMethod: 'searchNotes',
					// searchListMethod: 'searchNotebooks',
					searchFilterRequired: false,
					searchable: true,
				},
			},
			//by URL
			{
				displayName: 'By URL',
				name: 'url',
				type: 'string',
				placeholder: 'joplin://x-callback-url/openNote?id=e167983d038548ed96e680b23f5254f1',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: 'joplin:\/\/x\-callback\-url\/openNote\?id=[A-Za-z0-9]{32}',
							errorMessage: 'Not a valid Joplin note URL',
						},
					},
				],
				extractValue: {
					type: 'regex',
					regex: '[A-Za-z0-9]{32}',
				},
			},
			//by ID
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '[A-Za-z0-9]{32}',
							errorMessage: 'Not a valid Joplin Note ID',
						},
					},
				],
				placeholder: 'e167983d038548ed96e680b23f5254f1',
				url: '=joplin://x-callback-url/openNote?id={{$value}}',
			},
		],
		displayOptions: {
			show: {
				operation: ['assign', 'update', 'unassign'],
				resource: ['tag'],
			},
		},
		description: 'The ID of the Note',
	},

	// Select tags
	// {
	// 	displayName: 'Tag to assign',
	// 	name: 'tagId',
	// 	description:
	// 		'Select an existing Tag to assign',
	// 	type: 'options',
	// 	typeOptions: {
	// 		loadOptionsMethod: 'getTags',
	// 	},
	// 	required: true,
	// 	default: '',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['tag'],
	// 			operation: ['assign'],
	// 		},
	// 	},
	// },
	{
		displayName: 'Tag',
		name: 'tagId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		modes: [
			{

				//Select a note                             DF
				//displayName: 'From List',
				displayName: 'Tag',
				name: 'list',
				type: 'list',
				placeholder: 'Select a Tag...',
				typeOptions: {
					searchListMethod: 'searchTags',
					// searchListMethod: 'searchNotebooks',
					searchFilterRequired: false,
					searchable: true,
				},
			},

		],
		displayOptions: {
			show: {
				operation: ['assign', 'update', 'unassign'],
				resource: ['tag'],
			},
		},
		description: 'The ID of the Note',
	},


];
