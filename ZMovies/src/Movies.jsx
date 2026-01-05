const Movies = ({ movies = [] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => {
                if (!movie) return null;
                return (
                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer"
                        key={index}
                    >
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : `https://placehold.co/400x600?text=No+Poster`}
                                alt=''
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md w-fit mb-2">
                                    {movie.Type.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1 truncate" title={movie.Title}>
                                {movie.Title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                {movie.Year}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Movies;
