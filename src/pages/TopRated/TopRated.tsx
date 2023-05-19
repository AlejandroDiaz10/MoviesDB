import React, { useState, useEffect } from 'react';
import { MovieCard } from 'components/MovieCard';
import { getTopRated } from 'services';
import { CircularProgress } from '@mui/material';
import { SpinnerContainer, MainContainer, Header } from './styles';
import { useNavigate } from 'react-router-dom';

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---------------------------------------------------------- Movies DB APIs
  const getTopRatedMovies = async () => {
    await getTopRated()
      .then((res) => {
        if (res && res.data) {
          // console.log(res.data, 'res');
          setTopRatedMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err, 'err');
      });
    setLoading(false);
  }

  // ---------------------------------------------------------- Navigation
  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  // ---------------------------------------------------------- Use Effect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => getTopRatedMovies(), 1000);
  }, []);

  return (
    <>
      <MainContainer>
        {!loading ? (
          <>
            <Header>Top Rated</Header>
            {topRatedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                path={movie.poster_path}
                title={movie.title}
                voteAverage={movie.vote_average}
                genreId={movie.genre_ids[0]}
                id={movie.id}
                onClick={handleMovieClick}
              />
            ))}
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

export default TopRated