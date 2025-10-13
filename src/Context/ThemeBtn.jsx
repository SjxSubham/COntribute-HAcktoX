import { Sun, Moon } from "lucide-react"; // Import icons
import {useTheme} from "./theme"

function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  return (
    <button
      onClick={themeMode === "light" ? darkTheme : lightTheme}
      className="flex items-center mx-auto px-4 py-2 bg-violet-600 dark:bg-transparent text-white rounded-full transition-all duration-300 hover:bg-gray-600"
    >
      {themeMode === "light" ? (
        <>
          <Moon className="w-5 h-5" />
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 text-yellow-400" />
        </>
      )}
    </button>
  );
}

export default ThemeBtn;
