import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'johnrukstalis_storage',
    access: (allow) => ({
        "*": [
            allow.guest.to(["read"])
        ]
    })
});