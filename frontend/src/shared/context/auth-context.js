import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    },
    logout: () => { }
});
