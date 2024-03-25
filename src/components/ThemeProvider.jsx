import React, {createContext, useState} from 'react';
export const ThemeContextValue = createContext(null);
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(false);

    return (
        <ThemeContextValue.Provider value={{
            setTheme,
            theme
        }}>
            {children}
        </ThemeContextValue.Provider>
    );
};
export default ThemeProvider;



