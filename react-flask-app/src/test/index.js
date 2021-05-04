import {createAuthProvider} from 'react-token-auth';

export const [useAuthE, authFetch, loginE, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        localStorageKey: 'employee', 
        onUpdateToken: (token) => fetch('/api/refresh', {
            method: 'POST',
            body: token.access_token
        })
        .then(r => r.json())
    },);

    // tell react-token-auth about the /api/refresh endpoint that it can use to refresh our tokens

