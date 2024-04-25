import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
//   import { sizes } from "../utils/sizes";
  
  import * as SecureStore from "expo-secure-store";
import { Colors, darkColors, lightColors } from "@/constants/Colors";
  
  type ThemeContextType = {
    theme: string;
    colors: Colors;
    shadows: Record<string, any>;
    // sizes: Record<string, any>;
    toggleTheme: () => void;
  };
  interface ThemeProviderProps {
    children: ReactNode;
  }
  
  export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    colors: lightColors,
    shadows: { "": "" },
    // sizes: sizes,
    toggleTheme: () => {},
  });
  
  export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState("light");
  
    useEffect(() => {
      const loadTheme = async (): Promise<void> => {
        const dataFromStorage = await SecureStore.getItemAsync("theme");
        if (dataFromStorage) {
          const data = await JSON.parse(dataFromStorage);
          if (data) {
            setTheme(data);
          }
        }
      };
      loadTheme();
    }, []);
  
    const colors: Colors = theme === "light" ? lightColors : darkColors;
    const shadows = {
      "24DP_Penumbra": {
        shadowColor: "rgba(0, 0, 0, 0.14)",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 17,
      },
      "12DP_Penumbra": {
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 22,
      },
      "12DP_Umbra": {
        shadowColor: "rgba(0, 0, 0, 0.14)",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 17,
      },
    };
  
    const toggleTheme = async (): Promise<any> => {
      setTheme((oldTheme) => {
        const newTheme = oldTheme === "light" ? "dark" : "light";
        SecureStore.setItemAsync("theme", JSON.stringify(newTheme)); // Save the new theme
        return newTheme; // Return the new theme to update the state
      });
    };
  
    const context = {
      theme,
      colors,
      shadows,
    //   sizes,
      toggleTheme,
    };
  
    return (
      <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
    );
  };
  
  export const useTheme = () => {
    const context = useContext<ThemeContextType>(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };