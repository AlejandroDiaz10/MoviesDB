import httpInstance from "../httpInstance";

export const getPopular = async () => {
    let res: any;
    const endpoint = `popular?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;

    await httpInstance.get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((error) => {
            res = error.response;
        });
    return res;
}

export const getTopRated = async () => {
    let res: any;
    const endpoint = `top_rated?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;

    await httpInstance.get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((error) => {
            res = error.response;
        });
    return res;
}

export const getNowPlaying = async () => {
    let res: any;
    const endpoint = `now_playing?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;

    await httpInstance.get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((error) => {
            res = error.response;
        });
    return res;
}

export const getMovieDetails = async (movieId: number) => {
    let res: any;
    const endpoint = `${movieId}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;

    await httpInstance.get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((error) => {
            res = error.response;
        });
    return res;
}

export const getMovieRecommendations = async (movieId: number) => {
    let res: any;
    const endpoint = `${movieId}/recommendations?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;

    await httpInstance.get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((error) => {
            res = error.response;
        });
    return res;
}

