import { Sun, Moon } from "lucide-react"; // Import icons
import { useTheme } from "./theme"

function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  return (
    <button
      onClick={themeMode === "light" ? darkTheme : lightTheme}
      className="flex items-center mx-auto px-4 py-2 bg-violet-600 dark:bg-transparent text-white rounded-full transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
      aria-label={themeMode === "light" ? "Switch to dark mode" : "Switch to light mode"}
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
