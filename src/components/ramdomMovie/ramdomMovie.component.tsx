'use client'

import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/ui/loading-screen';
import React from 'react'
import useRamdomMovie from './useRamdomMovie';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function RamdomMovie() {
    const { methods, optionsGenres, loadingSearch, selectedRandomMovie, handleSubmit } = useRamdomMovie();

    const urlImageApi = `${process.env.NEXT_PUBLIC_TMDB_URL_IMAGE}/w300`

    return (
        <>
            {loadingSearch && <LoadingScreen message="Em busca do filme..." />}
            <div className="flex p-20 justify-center flex-col items-center relative">

                <div className="absolute top-2 right-1 bg-black bg-opacity-50 p-2 rounded-lg">
                    <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/assets/logos/tmbd-logo.svg"
                            alt="TMDB Logo"
                            width={100}
                            height={100}
                            className="w-24"
                        />
                    </a>
                </div>

                <h1 className="text-3xl font-bold mb-4">Qual será o filme hoje?</h1>

                <Form {...methods}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <FormField
                            control={methods.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {optionsGenres.map((option) => (
                                                    <SelectItem key={option.id} value={String(option.id)}>
                                                        {option.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={methods.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duração</FormLabel>
                                    <FormControl>
                                        <Input className='w-[180px]' type="number" placeholder="Duração máxima" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center justify-center'>
                            <Button type="submit">Estou com sorte</Button>
                        </div>
                    </form>
                </Form>





                <div className='flex items-center flex-col space-y-5 my-10'>
                    {selectedRandomMovie?.poster_path && <Image src={urlImageApi + selectedRandomMovie?.poster_path} alt={selectedRandomMovie?.title} width={300} height={450} />}

                    <div className="flex w-full flex-col space-y-5 justify-center overflow-hidden break-words text-center sm:text-left">
                        {selectedRandomMovie?.title && <p className="w-full max-w-[90vw] break-words">Título: {selectedRandomMovie.title}</p>}

                        {selectedRandomMovie?.overview && (
                            <div className="space-y-2">
                                <p>Descrição:</p>
                                <p className="w-full max-w-[90vw] break-words">{selectedRandomMovie.overview}</p>
                            </div>
                        )}

                        {selectedRandomMovie?.release_date && (
                            <p className="w-full max-w-[90vw] break-words">Data de lançamento: {selectedRandomMovie.release_date}</p>
                        )}
                    </div>
                </div>


            </div>
        </>
    )
}
