import React, { useState, useEffect } from 'react';
import { getMovieDetails, getMovieRecommendations } from 'services';
import { MovieCard } from 'components/MovieCard';
import { CircularProgress } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { SpinnerContainer, MainContainer, Header, ImageContainer, Image, InfoContainer, Text, Carousel, Section, MovieTitle, Wrapper, MovieContainer, Bar, Icon, Pill, Button } from './styles';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
    const [movieDetail, setMovieDetail] = useState<any>();
    const [movieRecommendations, setMovieRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [isFavoriteId, setIsFavoriteId] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // ---------------------------------------------------------- Movies DB APIs
    const getMovieDetail = async (movieId: number) => {
        await getMovieDetails(movieId)
            .then((res) => {
                if (res && res.data) {
                    setMovieDetail(res.data);
                }
                // Getting the IDs stored in the Local Storage (if they exist)
                const parsedIds = JSON.parse(localStorage.getItem('favorites') || '[]');

                // Update the state with the array of IDs from the local storage
                setFavoriteIds(parsedIds);

                // Check if the ID is already in the array
                if (parsedIds.includes(parseInt(id!))) {
                    setIsFavoriteId(true);
                } else {
                    setIsFavoriteId(false);
                }
                // console.log(favoriteIds);
            })
            .catch((err) => {
                console.log(err, 'err');
            });
        // setLoading(false);
    };

    const getRecommendationMovies = async (movieId: number) => {
        await getMovieRecommendations(movieId)
            .then((res) => {
                if (res && res.data) {
                    // console.log(res.data, 'res');
                    setMovieRecommendations(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err, 'err');
            });
        // setLoading(false);
    }

    // ---------------------------------------------------------- Navigation
    const handleMovieClick = (id: number) => {
        navigate(`/movie/${id}`);
    };

    // ---------------------------------------------------------- Local Storage
    // ---------------------------------------------------------- https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
    const addToFavorites = () => {
        const updatedIds = [...favoriteIds, parseInt(id!)];

        // Update the states considering the new array of IDs
        setFavoriteIds(updatedIds);
        setIsFavoriteId(true);

        // Update the array of IDs in Local Storage
        localStorage.setItem('favorites', JSON.stringify(updatedIds));
        // console.log("ID:", favoriteIds)
    };

    const removeFromFavorites = () => {
        let currentIds = [...favoriteIds];
        currentIds = currentIds.filter((c) => c !== parseInt(id!));

        // Update the states
        setFavoriteIds(currentIds);
        setIsFavoriteId(false);

        // Update the array of IDs in Local Storage
        localStorage.setItem('favorites', JSON.stringify(currentIds));
        // console.log("ID:", favoriteIds)
    };

    // ---------------------------------------------------------- Use Effect
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    getMovieDetail(parseInt(id!)),
                    getRecommendationMovies(parseInt(id!))
                ]);
            } catch (err) {
                console.log(err, 'err');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [id]);

    // useEffect(() => {
    //     // console.log("ID:", favoriteIds)
    //     setLoading(true);
    //     setTimeout(() => {
    //         getMovieDetail(parseInt(id!))
    //         getRecommendationMovies(parseInt(id!))
    //     }, 1000);
    // }, []);

    // useEffect(() => {
    //     console.log("ID:", favoriteIds)
    // }, [favoriteIds]);

    const posterImage = movieDetail?.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : '';

    return (
        <>
            <Wrapper>
                {!loading ? (
                    <>
                        <MovieContainer>
                            <ImageContainer><Image src={posterImage} alt="Movie Image" /></ImageContainer>
                            <InfoContainer>
                                <MovieTitle>{movieDetail?.original_title}</MovieTitle>
                                <Bar style={{ marginBottom: '20px' }}>
                                    <Icon><PeopleAltIcon /> <>&nbsp;</> {movieDetail?.adult ? '18+' : '18-'}</Icon>
                                    <Icon><WatchLaterIcon /> <>&nbsp;</> {movieDetail?.runtime} min.</Icon>
                                    <Icon><CalendarMonthIcon /> <>&nbsp;</>{movieDetail?.release_date?.slice(0, 4)}</Icon>
                                    <Icon><StarIcon /> <>&nbsp;</>{movieDetail?.vote_average}</Icon>
                                    <Icon><AssessmentIcon /> <>&nbsp;</> {movieDetail?.vote_count}</Icon>
                                </Bar>

                                <Text>{movieDetail?.tagline && `"${movieDetail.tagline}"`}</Text>
                                <Text>{movieDetail?.overview}</Text>

                                <h3 style={{ marginBottom: '0' }}>Genres</h3>
                                <Bar >
                                    {movieDetail?.genres.map((genre: any) => (
                                        <Pill key={genre.id} >{genre.name}</Pill>
                                    ))}
                                </Bar>

                                <h3 style={{ margin: '30px auto 0' }}>Favorite</h3>
                                {isFavoriteId ? (
                                    <Button style={{ backgroundColor: 'red' }} onClick={removeFromFavorites}>
                                        <HeartBrokenIcon /> <>&nbsp;</> Delete from Favorites
                                    </Button>
                                ) : (
                                    <Button style={{ backgroundColor: 'blue' }} onClick={addToFavorites}>
                                        <FavoriteIcon /> <>&nbsp;</> Add to Favorites
                                    </Button>
                                )}
                            </InfoContainer>
                        </MovieContainer>

                        <Section>
                            <Header >Recommendations</Header>
                            <Carousel>
                                <MainContainer>
                                    {movieRecommendations.map((movie) => (
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
                    </>
                ) : (
                    <>
                        <MovieTitle>Loading...</MovieTitle>
                        <SpinnerContainer>
                            <CircularProgress size={"10%"} />
                        </SpinnerContainer>
                    </>
                )}
            </Wrapper >
        </>
    )
}

export default MovieDetails