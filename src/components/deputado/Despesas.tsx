"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { Despesas } from "@/types/Despesas.type";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";

interface DespesasDeputadoProps {
    id: string;
}
export default function DespesasDeputado({ id }: DespesasDeputadoProps) {
    const [tipoDespesaFiltrado, setTipoDespesaFiltrado] = useState<string | null>('');

    const sumDespesas = (despesas: Despesas[]) => {
        return despesas.reduce((total, despesa) => total + parseFloat(despesa.valorLiquido.toString()), 0).toFixed(2);
    };

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

    const handleFilterChange = (tipoDespesa: any) => {
        setTipoDespesaFiltrado(tipoDespesa);
    };

    data?.pages.map((page: any) => {
        page.dados.map((despesa: Despesas) => {
            console.log(despesa.tipoDespesa);
        })
    })

    return (
        <section className="w-full min-h-[calc(100dvh_-_5rem)] bg-background">
            <div className="flex flex-col gap-1 w-[80dvw] mx-auto pt-5">
                <div className="flex flex-row gap-2 flex-wrap w-full">
                    <Button variant="outline" onClick={() => handleFilterChange('')}>
                        Todos
                    </Button>
                    <Button variant="outline" onClick={() => handleFilterChange('MANUTENÇÃO DE ESCRITÓRIO DE APOIO À ATIVIDADE PARLAMENTAR')}>
                        MANUTENÇÃO DE ESCRITÓRIO DE APOIO À ATIVIDADE PARLAMENTAR
                    </Button>
                    <Button variant="outline" onClick={() => handleFilterChange('COMBUSTÍVEIS E LUBRIFICANTES.')}>
                        COMBUSTÍVEIS E LUBRIFICANTES
                    </Button>
                    <Button variant="outline" onClick={() => handleFilterChange('LOCAÇÃO OU FRETAMENTO DE VEÍCULOS AUTOMOTORES')}>
                        LOCAÇÃO OU FRETAMENTO DE VEÍCULOS AUTOMOTORES
                    </Button>
                </div>
                {data && tipoDespesaFiltrado && (
                    <div className="mt-3">
                        <span>Soma das despesas do tipo {tipoDespesaFiltrado}: {" "}
                            <span className="bg-secondary p-2 rounded-sm">R${sumDespesas(data.pages.flatMap((page: any) => page.dados.filter((despesa: Despesas) => despesa.tipoDespesa === tipoDespesaFiltrado)))}</span>
                        </span>
                    </div>
                )}
            </div>
            <div className="w-[80dvw] mx-auto py-5 min-h-full flex flex-wrap justify-start items-center">
                {data &&
                    data.pages.map((page: any, index: number) => (
                        <React.Fragment key={index}>
                            {page.dados
                                .filter((despesa: Despesas) => !tipoDespesaFiltrado || despesa.tipoDespesa === tipoDespesaFiltrado)
                                .map((despesa: Despesas, key: number) => (
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
