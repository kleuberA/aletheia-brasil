"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { Despesas } from "@/types/Despesas.type";
import { Button } from "../ui/button";
import React from "react";

interface DespesasDeputadoProps {
    id: string;
}
export default function DespesasDeputado({ id }: DespesasDeputadoProps) {

    const fetchDespesas = async (pageParam: number) => {
        const res = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=DESC&ordenarPor=ano&pagina=${pageParam}`);
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
        queryKey: ['despesas'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetchDespesas(pageParam);
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
                            {page.dados.map((despesa: Despesas, key: number) => (
                                <div key={key} className="border border-border hover:bg-secondary w-72 flex-shrink-0 mb-3 mr-3 flex flex-row gap-3 rounded-md">
                                    <div className="flex flex-col gap-1 w-full h-full">
                                        <div className="flex flex-row justify-between border-b border-border p-2">
                                            <span className="text-sm font-bold font-mono">Mês: {despesa.mes}</span>
                                            <span className="text-sm font-bold font-mono">Ano: {despesa.ano}</span>
                                        </div>
                                        <div className="flex flex-col p-2">
                                            <h1 className="text-sm">{despesa.tipoDespesa}</h1>
                                            <span className="text-sm font-mono">Fornecedor: <span className="font-bold">{despesa.nomeFornecedor}</span> </span>
                                            <div className="flex flex-row justify-between">
                                                <span className="text-sm font-mono">Valor: <span className="font-bold">R${despesa.valorLiquido}</span></span>
                                                <span className="text-sm font-mono">Data: <span className="font-bold">{despesa.dataDocumento}</span></span>
                                            </div>
                                            <span className="text-sm font-mono">Tipo Documento: <span className="font-bold">{despesa.tipoDocumento}</span> </span>
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
