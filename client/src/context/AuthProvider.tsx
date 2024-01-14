import React, {createContext, useContext, ReactNode} from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    auth_login: () => void;
    auth_logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const auth_login = () => {
        setIsAuthenticated(true);
    };

    const auth_logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, auth_login: auth_login, auth_logout: auth_logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth have a problem');
    }
    return context;
};
