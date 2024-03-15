"use client"
import { useInfiniteQuery, } from "@tanstack/react-query"
import React from "react"

export default function ListaDeputados() {

    const fetchDeputados = async (pageParam: number) => {
        const res = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=10&pagina=' + pageParam);
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
        queryKey: ['deputados'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetchDeputados(pageParam);
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
        <section>
            {data && data.pages.map((page: any, i: any) => (
                <div key={i}>
                    {page.dados.map((deputado: any, j: any) => (
                        <div key={j}>
                            <p>{deputado.nome}</p>
                        </div>
                    ))}
                </div>
            ))}
            <div>
                {hasNextPage && (
                    <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading More...' : (data?.pages.length ?? 0) < 55 ? 'Load More' : 'Nothing more to load'}
                    </button>
                )}
            </div>
            <div>
                {isFetching && !isFetchingNextPage
                    ? 'Background Updating...'
                    : null}
            </div>
        </section>
    )
}