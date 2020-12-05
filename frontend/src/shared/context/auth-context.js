import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    login: () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    },
    logout: () => { }
});
