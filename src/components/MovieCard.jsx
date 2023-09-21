
const MovieCard = ({ movieData }) => {
  return (
    <div className="movie-card">
      <img className="movie-poster" src={movieData.Poster} alt={`${movieData.Title} Poster`} />
      <div className="movie-details">
        <h2 className="movie-title"><strong>Title:</strong> {movieData.Title}</h2>
        <p className="movie-year"><strong>Year: </strong>{movieData.Year}</p>
        <p className="movie-genre"><strong>Genre:</strong> {movieData.Genre}</p>
        <p className="movie-plot"><strong>Plot:</strong> {movieData.Plot}</p>
      </div>
    </div>
  );
};

export default MovieCard;
