
import { useEffect, useState } from "react";
import { SearchIcon, Film } from 'lucide-react';
import Movies from "./Movies";
import ThemeToggle from "./ThemeToggle";

const App = () => {

  const API_URL = 'http://www.omdbapi.com/?apikey=bbe50bc8'
  const [movieObject, setMovieObject] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const response = await fetch(`${API_URL}&s=avengers`)
      const data = await response.json()
      setMovieObject(data.Search)
      setLoading(false)
    }
    fetchMovies()
  }, [])


  const searchMovies = async (title) => {
    setLoading(true)
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovieObject(data.Search)
    setLoading(false)
  }


  const handleSearchItem = (e) => {
    setSearchItem(e.target.value)
  }


  const handleClick = () => {
    if (searchItem) {
      searchMovies(searchItem)
    } else {
      searchMovies()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Film className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Z-Movies
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-white"
          >
            Find your next <span className="text-blue-600 dark:text-blue-500">favorite</span> movie
          </motion.h2>

          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-full shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10 overflow-hidden">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchItem}
                onChange={handleSearchItem}
                onKeyDown={handleKeyDown}
                className="flex-1 w-full bg-transparent border-0 py-4 pl-6 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-lg"
              />
              <button
                onClick={handleClick}
                className="p-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors"
              >
                <SearchIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            movieObject && <Movies movies={movieObject} />
          )}
          {!loading && !movieObject && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
              No movies found. Try searching for something else.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

