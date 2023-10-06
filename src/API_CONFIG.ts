const optionFecthMovieApi = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
    }
}

export { optionFecthMovieApi }