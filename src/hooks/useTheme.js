import { useContext } from "react"
import { ThemeContext } from "../context/ThemeProvider"

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(context === undefined){
        throw new Error('useTheme() must be called inside a ThemeProvider');
    }

    return context;
}