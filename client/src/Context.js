import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [searchUserName, setSearchUserName] = useState(null);

    return (
        <UserContext.Provider 
            value={{
                searchUserName,
                setSearchUserName
            }}
        >
            {children}
        </UserContext.Provider>
    );
};



