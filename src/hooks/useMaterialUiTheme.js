import { createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { GlobalContext } from "../context/AppContext";

const useMaterialUIThemeChanger = () => {
    const { theme } = useContext(GlobalContext);
    return createTheme({
        palette: {
            mode: theme==="light" ? "light" : "dark",
            primary: {
                main: '#3b82f6',
            },
            secondary: {
                main: '#fbbf24',
            },
        }
    });
};

export default useMaterialUIThemeChanger;
