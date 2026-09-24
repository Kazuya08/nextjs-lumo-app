import { useEffect, useState } from "react";
import { IMovie, IUseRamdomMovieReturn } from "./ramdomMovie.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRamdomMovie } from "./ramdomMovie.type";
import { ramdomMovieSchema } from "@/modules/ramdomMovie";
import TmdbApi from "@/shared/TmdbApi";

function useRamdomMovie(): IUseRamdomMovieReturn {
    const [selectedRandomMovie, setSelectedRandomMovie] = useState<IMovie>();
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

    const methods = useForm<IRamdomMovie>({
        resolver: zodResolver(ramdomMovieSchema),
        defaultValues: {
            category: "27",
            time: "120",
        },
    });

    const optionsGenres = [
        {
            id: 28,
            name: "Action",
        },
        {
            id: 12,
            name: "Adventure",
        },
        {
            id: 16,
            name: "Animation",
        },
        {
            id: 35,
            name: "Comedy",
        },
        {
            id: 80,
            name: "Crime",
        },
        {
            id: 99,
            name: "Documentary",
        },
        {
            id: 18,
            name: "Drama",
        },
        {
            id: 10751,
            name: "Family",
        },
        {
            id: 14,
            name: "Fantasy",
        },
        {
            id: 36,
            name: "History",
        },
        {
            id: 27,
            name: "Horror",
        },
        {
            id: 10402,
            name: "Music",
        },
        {
            id: 9648,
            name: "Mystery",
        },
        {
            id: 10749,
            name: "Romance",
        },
        {
            id: 878,
            name: "Science Fiction",
        },
        {
            id: 10770,
            name: "TV Movie",
        },
        {
            id: 53,
            name: "Thriller",
        },
        {
            id: 10752,
            name: "War",
        },
        {
            id: 37,
            name: "Western",
        },
    ];

    useEffect(() => {
        if (loadingSearch) {
            const timer = setTimeout(() => {
                setLoadingSearch(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [loadingSearch]);

    async function buscarFilmeAleatorio(genderId: number, timeMax: number) {
        setLoadingSearch(true);

        try {
            // 1. Buscar os filmes do gênero especificado
            const { data } = await TmdbApi.get("discover/movie", {
                params: { with_genres: genderId, page: 1 },
            });

            // 2. Filtrar filmes pela duração
            const filmes = await Promise.all(
                data.results.map(async (filme: { id: number }) => {
                    try {
                        const { data: detalhes } = await TmdbApi.get(`movie/${filme.id}`);
                        return detalhes.runtime <= timeMax ? detalhes : null;
                    } catch (error) {
                        console.error(`Erro ao buscar detalhes do filme ${filme.id}:`, error);
                        return null;
                    }
                })
            );

            // Remover filmes nulos (que não atendem ao critério de tempo)
            const filmesFiltrados = filmes.filter((f) => f !== null);

            // 3. Escolher um filme aleatório
            if (filmesFiltrados.length > 0) {
                const filmeAleatorio =
                    filmesFiltrados[Math.floor(Math.random() * filmesFiltrados.length)];
                setSelectedRandomMovie(filmeAleatorio);
            }

            //TODO: salvar os Ids dos filmes que já apareceram para não repetir
        } catch (error) {
            console.error("Erro ao buscar filme:", error);
        }
    }

    const onSubmit = async (payload: IRamdomMovie) => {
        await buscarFilmeAleatorio(Number(payload.category), Number(payload.time));

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return {
        methods,
        optionsGenres,
        loadingSearch,
        selectedRandomMovie,
        handleSubmit: methods.handleSubmit(onSubmit),
    };
}

export default useRamdomMovie;
