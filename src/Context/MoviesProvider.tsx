'use client'

import { MovieContext } from "./MoviesContext";
import { useState, useEffect } from "react";

import { IGenre } from "@/Interfaces/Movies.interface";

export default function MovieProvider({
    children,
}: {
    children: React.ReactNode
}) {

    const [genres, setGenres] = useState([]);

    const optionsFetch = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`
        }
    };

    /* Función para traer los géneros de la API */
    const getGenres = async () => {
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', optionsFetch);

        if (!res.ok) {
            throw new Error('Failed to fetch Top Rated Movies')
        }

        const data = await res.json();
        setGenres(data.genres);
        return data
    };

    const genresMap = new Map();
    genres.forEach((genre: IGenre) => {
        genresMap.set(genre.id, genre.name)
    })

    useEffect(() => {
        getGenres();
    }, [])

    /* Test git */
    
    return (
        <MovieContext.Provider value={{
            genresMap,
        }}>
            {children}
        </MovieContext.Provider>
    )

}