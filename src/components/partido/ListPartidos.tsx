"use client"
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import React from "react";

export default function ListPartidos() {

    const fetchPartidos = async (pageParam: number) => {
        const res = await fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla&pagina=${pageParam}`);
        return res.json();
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['partidos'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetchPartidos(pageParam);
            return res;
        },
        initialPageParam: 1,
        getNextPageParam: (_, pages) => {
            return pages.length + 1;
        },
    })

    if (isLoading) return (
        <section>
            <p>Loading...</p>
        </section>
    )

    if (error) return (
        <section>
            <p>Error: {error.message}</p>
        </section>
    )

    return (
        <section className="w-full min-h-[calc(100dvh_-_5rem)] bg-background">
            <div className="w-[80vw] mx-auto py-5 min-h-full flex flex-wrap justify-start items-center">
                {data &&
                    data.pages.map((page: any, index: number) => (
                        <React.Fragment key={index}>
                            {page.dados.map((partido: any, key: number) => (
                                <div key={key} className="border border-border hover:bg-secondary w-72 flex-shrink-0 mb-3 mr-3 flex flex-row gap-3 rounded-md">
                                    <div className="flex flex-col gap-1 w-full h-full">
                                        <div className="flex flex-col justify-between border-b border-border p-2">
                                            <span className="text-sm font-bold font-mono">Nome: {partido.nome}</span>
                                            <span className="text-sm font-bold font-mono">Sigla: {partido.sigla}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
            </div>
            <div className="w-[80dvw] mx-auto flex items-center justify-center p-5">
                {hasNextPage && (
                    <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading More...' : (data?.pages.length ?? 0) < 200 ? 'Ver Mais' : 'Nothing more to load'}
                    </Button>
                )}
            </div>
        </section>
    )
}