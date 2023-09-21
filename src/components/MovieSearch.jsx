import { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.CSS";
import MovieCard from './MovieCard';

const OMDB_API_KEY = 'd024085f';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?t=The+Conjuring&apikey=${OMDB_API_KEY}`);
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Error fetching movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  console.log(movieData);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${searchTerm}&apikey=${OMDB_API_KEY}`);
      if (response.data.Response === "False") {
        setError('Movie not found!');
        setMovieData(null);
      } else {
        setMovieData(response.data);
        setError(null); 
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setMovieData(null);
      setError('Error fetching movie data. Please try again later.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="form">
      <h1>Movie search 🎬</h1>
      <input
        type="text"
        placeholder="Ex: The conjuring"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
  
      {error && (
        <div className="movie-card">
          <p className="error-message">{error}</p>
        </div>
      )}
  
      {loading ? (
        <p>Loading...</p>
      ) : movieData ? ( 
        <MovieCard movieData={movieData} />
      ) : null}
    </div>
  );
  
}

export default MovieSearch;
