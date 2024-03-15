"use client"
import { Deputado } from "@/types/Deputado.type";
import { useInfiniteQuery, } from "@tanstack/react-query"
import Image from "next/image";
import React from "react"
import { Button } from "../ui/button";
import Link from "next/link";

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
        <section className="w-full min-h-screen bg-background">
            <div className="w-[80vw] mx-auto py-5 min-h-full flex flex-wrap justify-start items-center">
                {data &&
                    data.pages.map((page: any, index: number) => (
                        <React.Fragment key={index}>
                            {page.dados.map((deputado: Deputado, key: number) => (
                                <Link href={`/deputado/${deputado.id}`} key={key} className="border border-border hover:bg-secondary p-2 w-72 flex-shrink-0 mb-3 mr-3 flex flex-row gap-3 rounded-md">
                                    <div>
                                        <Image
                                            src={deputado.urlFoto}
                                            alt={deputado.nome}
                                            width={100}
                                            height={100}
                                            className="rounded-md hover:scale-105 transition-all duration-200"
                                        />
                                    </div>
                                    <div className="">
                                        <p>{deputado.nome}</p>
                                        <p className="text-sm">Partido: {deputado.siglaPartido}</p>
                                        <p>UF: {deputado.siglaUf}</p>
                                    </div>
                                </Link>
                            ))}
                        </React.Fragment>
                    ))}
            </div>
            <div className="w-[80dvw] mx-auto flex items-center justify-center p-5">
                {hasNextPage && (
                    <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading More...' : (data?.pages.length ?? 0) < 55 ? 'Ver Mais' : 'Nothing more to load'}
                    </Button>
                )}
            </div>
            {/* <div>
                {isFetching && !isFetchingNextPage
                    ? 'Background Updating...'
                    : null}
            </div> */}
        </section>
    )
}