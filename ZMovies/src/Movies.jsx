const Movies = ({movies = []}) => {
    return (
        <>
            {movies.map((movie, index) => {
                if (!movie) return null;
                return (
                    <div className="" key={index}>
                        <div className="">
                            <p>{movie.Year}</p>
                        </div>
                        <div className="">
                            <img src={movie.Poster !== "N/A"? movie.Poster : `https://placehold.co/200`} alt="" />
                        </div>
                        <div className="">
                            <span className="">{movie.Type}</span>
                            <h3 className="">{movie.Title}</h3>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Movies;
