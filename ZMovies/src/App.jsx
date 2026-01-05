import { useEffect, useState } from "react";
import { SearchIcon } from 'lucide-react';
import Movies from "./Movies";


const App = () => {

  const API_URL = 'http://www.omdbapi.com/?apikey=bbe50bc8'
  const [movieObject, setMovieObject] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=bbe50bc8`)
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
    console.log(data.Search)
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


  return (
    <div className="">
      <h1 className="">Z-Movies</h1>
      <div className="">
        <input type="text"
          placeholder="Search for movies"
          value={searchItem}
          onChange={handleSearchItem}
        />
        <SearchIcon className="h-6 w-6 text-gray-400" onClick={handleClick}/>
      </div>
      <div className="container">
        {loading && <div className="">Loading movies...</div>}
        {movieObject && <Movies movies={movieObject} />}
      </div>
    </div>
  );
}

export default App;

