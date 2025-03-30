import { UseFormReturn } from "react-hook-form";

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Productioncompany[];
    production_countries: Productioncountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Spokenlanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Spokenlanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface Productioncountry {
    iso_3166_1: string;
    name: string;
}

interface Productioncompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IRamdomMovie {
    category: string;
    time: string;
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IUseRamdomMovieReturn {
    methods: UseFormReturn<IRamdomMovie>
    loadingSearch: boolean;
    selectedRandomMovie?: IMovie;
    optionsGenres: IGenre[];
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>

}
