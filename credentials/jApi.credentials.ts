import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class jApi implements ICredentialType {
	name = 'jApi';
	displayName = 'Joplin API';
	properties: INodeProperties[] = [
		{
			displayName: 'URL1',
			name: 'baseUrl',
			type: 'string',
			typeOptions: { password: false },
			default: '',
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: false },
			default: '',
		},
	];

}
