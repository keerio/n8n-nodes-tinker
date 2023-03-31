"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jApi = void 0;
class jApi {
    constructor() {
        this.name = 'jApi';
        this.displayName = 'Joplin API';
        this.properties = [
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
}
exports.jApi = jApi;
//# sourceMappingURL=jApi.credentials.js.map