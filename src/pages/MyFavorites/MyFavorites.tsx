import React, { useEffect, useState } from 'react';
import { getMovieDetails } from 'services';
import { MovieCard } from 'components/MovieCard';
import { CircularProgress } from '@mui/material';
import { SpinnerContainer, MainContainer, Header } from './styles';
import { useNavigate } from 'react-router-dom';

const MyFavorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---------------------------------------------------------- Movies DB APIs
  const getMovieDetail = async (movieId: number) => {
    try {
      const response = await getMovieDetails(movieId);
      if (response && response.data) {
        return response.data; // Devuelve el objeto de película
      } else {
        throw new Error('No se encontraron datos de la película');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los detalles de la película');
    }
  };

  // ---------------------------------------------------------- Navigation
  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  // ---------------------------------------------------------- Use Effect
  useEffect(() => {
    setLoading(true);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchFavoriteMovies = async () => {
      const parsedIds = JSON.parse(localStorage.getItem('favorites') || '[]');

      // Simulate one second delay
      await delay(1000);

      const favoriteMoviesData = await Promise.all(
        parsedIds.map((movieId: number) => getMovieDetail(movieId))
      );

      setFavoriteMovies(favoriteMoviesData);
      setLoading(false);
    };

    fetchFavoriteMovies();
  }, []);


  return (
    <>
      <MainContainer>
        {!loading ? (
          <>
            <Header>My Favorites</Header>
            {favoriteMovies.length === 0 ? (
              <h3>No favorites added!</h3>
            ) : (
              favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  path={movie.poster_path}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  genreId={movie.genres[0]}
                  id={movie.id}
                  onClick={handleMovieClick}
                />
              ))
            )}
          </>
        ) : (
          <>
            <Header>Loading...</Header>
            <SpinnerContainer>
              <CircularProgress size={"10%"} />
            </SpinnerContainer>
          </>
        )}
      </MainContainer>
    </>
  );

}

export default MyFavorites