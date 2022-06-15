import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state;
    }

}

export default function ThemeProvider({ children }) {
    const theme = localStorage.getItem('recipe_ninja_theme');
    // console.log(theme);
    // if (theme) {
    //     theme = JSON.parse(theme)
    //     console.log(theme);
    // }
    // else {
    //     const init = { color: '#58249c', mode: 'light' }
    // }
    const [state, dispatch] = useReducer(themeReducer, theme ? JSON.parse(theme) : {
        color: '#58249c',
        mode: 'light'
    });

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color });
        localStorage.setItem('recipe_ninja_theme', JSON.stringify({ ...state, color }));
    }

    const toggleMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode });
        localStorage.setItem('recipe_ninja_theme', JSON.stringify({ ...state, mode }));
    }

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
}