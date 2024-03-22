"use client"
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface PartidoByIdProps {
    id: string;
}
export default function PartidoById({ id }: PartidoByIdProps) {

    const fetchPartido = async (id: string) => {
        const res = await fetch('https://dadosabertos.camara.leg.br/api/v2/partidos/' + id);
        return res.json();
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['partidoById', id],
        queryFn: () => fetchPartido(id)
    });

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

    let idDeputado = data.dados.status.lider.uri.split('/').pop();
    let idLegislatura = data.dados.status.idLegislatura;
    let sigla = data.dados.sigla;

    return (
        <section className="w-full min-h-[calc(100dvh_-_5rem)]">
            <div className="w-[80dvw] mx-auto h-full p-5">
                <div className="flex flex-col gap-3 w-full">
                    <div className="border border-border p-2 rounded-sm">
                        <h1 className="text-3xl font-mono font-bold">{data.dados.nome}</h1>
                        <p className="font-mono text-xl font-semibold">Sigla: {data.dados.sigla}</p>
                        <img src={data.dados.urlLogo} />
                    </div>
                    <div className="flex flex-row gap-5 w-full">
                        <div className="border border-border p-2 rounded-sm w-full flex flex-col gap-1">
                            <h1 className="text-xl font-bold font-mono">Informaçoes do Partido</h1>
                            <p className="font-mono font-semibold">Situação: {data.dados.status.situacao}</p>
                            <p className="font-mono font-semibold">Total de membros: {data.dados.status.totalMembros}</p>
                            <p className="font-mono font-semibold">Total de posse: {data.dados.status.totalPosse}</p>
                            <Link href={`/partido/membros/${idLegislatura}/${sigla}`} className="w-32">
                                <Button variant="outline">Ver Membros</Button>
                            </Link>
                        </div>
                        <div className="border border-border p-2 rounded-sm w-full flex flex-row gap-2">
                            <Image width={100} height={100} src={data.dados.status.lider.urlFoto} alt={""} />
                            <div>
                                <p className="font-mono font-semibold">Lider: {data.dados.status.lider.nome}</p>
                                <p className="font-mono font-semibold">UF: {data.dados.status.lider.uf}</p>
                                <p className="font-mono font-semibold">Partido: {data.dados.status.lider.siglaPartido}</p>
                                <Link href={`/deputado/${idDeputado}`} >
                                    <Button variant="outline">Ver Informações Presidente</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}