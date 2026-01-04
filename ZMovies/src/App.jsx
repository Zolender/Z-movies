import { useEffect } from "react";

const App = () => {

  const API_URL = ' http://www.omdbapi.com/?apikey=bbe50bc8'
  async function searchMovies(title){
    const reponse = await fetch(`${API_URL}&s=${title}`)
  }

  useEffect(()=>{

  },[])
  return (
    <>

    </>
  );
}

export default App;