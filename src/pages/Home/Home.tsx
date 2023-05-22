import React, { useEffect, useState } from 'react';
import { getPopular, getTopRated, getNowPlaying } from 'services';
import { MovieCard } from 'components/MovieCard';
import { CircularProgress } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { SpinnerContainer, MainContainer, Header, Carousel, HomeWrapper, Section, HeaderContainer } from './styles';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---------------------------------------------------------- Movies DB APIs
  const getPopularMovies = async () => {
    await getPopular()
      .then((res) => {
        if (res && res.data) {
          // console.log(res.data, 'res');
          setPopularMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err, 'err');
      });
    setLoading(false);
  }

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

  const getNowPlayingMovies = async () => {
    await getNowPlaying()
      .then((res) => {
        if (res && res.data) {
          // console.log(res.data, 'res');
          setNowPlayingMovies(res.data.results);
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

  // ---------------------------------------------------------- Navigation
  const handleNavigationClick = (page: string) => {
    navigate(`/${page}`);
  };

  // ---------------------------------------------------------- Use Effect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getPopularMovies()
      getTopRatedMovies()
      getNowPlayingMovies()
    }, 1000);
  }, []);

  return (
    <>
      {!loading ? (
        <HomeWrapper>
          <Section>
            <HeaderContainer>
              <Header onClick={() => handleNavigationClick("popular")} >Popular <span><NavigateNextIcon style={{ fontSize: 30 }} /></span> </Header>
            </HeaderContainer>
            <Carousel>
              <MainContainer>
                {popularMovies.map((movie) => (
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
              </MainContainer>
            </Carousel>
          </Section>

          <Section>
            <HeaderContainer>
              <Header onClick={() => handleNavigationClick("top-rated")}>Top Rated <span><NavigateNextIcon style={{ fontSize: 30 }} /></span></Header>
            </HeaderContainer>
            <Carousel>
              <MainContainer>
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
              </MainContainer>
            </Carousel>
          </Section>

          <Section>
            <HeaderContainer>
              <Header onClick={() => handleNavigationClick("now-playing")}>Now Playing <span><NavigateNextIcon style={{ fontSize: 30 }} /></span></Header>
            </HeaderContainer>
            <Carousel>
              <MainContainer>
                {nowPlayingMovies.map((movie) => (
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
              </MainContainer>
            </Carousel>
          </Section>
        </HomeWrapper>
      ) : (
        <>
          <Header>Loading...</Header>
          <SpinnerContainer>
            <CircularProgress size={"10%"} />
          </SpinnerContainer>
        </>
      )}
    </>
  )
}

export default Home;