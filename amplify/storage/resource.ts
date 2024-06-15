import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'johnrukstalis-storage',
    access: (allow) => ({
        'assets/*': [
            allow.guest.to(['read'])
        ],
        'picture-submissions/*': [
            allow.authenticated.to(['read', 'write']),
            allow.guest.to(['read', 'write'])
        ],
    })
});