import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ data }) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(data || []);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null); // 👈 reference to the whole component

  // Ctrl + K keyboard shortcut
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Filter logic
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(data);
    } else {
      setFiltered(
        data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, data]);

  // 👇 Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-50 ">
      <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white focus-within:ring-2 focus-within:ring-pink-400">
        <FiSearch className="mr-2 text-pink-400" />
        <input
          id="search-input"
          type="text"
          placeholder="Search content... (Ctrl + K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          className="bg-transparent outline-none flex-1 text-white placeholder-indigo-300"
          aria-label="Search through site content"
        />
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="absolute left-0 right-0 mt-3 bg-black/70 border border-white/10 rounded-xl shadow-lg backdrop-blur-lg text-white max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer transition"
              >
                <span className="font-semibold text-pink-400">
                  {item.category}:
                </span>{" "}
                {item.title}
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-indigo-300">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
