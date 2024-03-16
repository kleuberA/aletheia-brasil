"use client"
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface DeputadoProps {
    id: string;
}
export default function DeputadoContainer({ id }: DeputadoProps) {

    const fetchDeputado = async (id: string) => {
        const res = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/' + id);
        return res.json();
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['deputado', id],
        queryFn: () => fetchDeputado(id)
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

    console.log(data);
    console.log(data.dados.ultimoStatus.uriPartido.split('/').pop())
    let idPartido = data.dados.ultimoStatus.uriPartido.split('/').pop();

    return (
        <section className="w-full min-h-[calc(100dvh_-_5rem)] p-10">
            <div className="w-[80dvw] h-full mx-auto">
                <div className="flex w-full h-full flex-col gap-5">
                    <div className="flex flex-row gap-5">
                        <div className="p-2 border border-border rounded-sm flex flex-col gap-2">
                            <h1 className="font-bold text-2xl font-mono text-center">Informações</h1>
                            <div className="flex justify-center items-center w-full">
                                <Image src={data.dados.ultimoStatus.urlFoto} alt={data.dados.ultimoStatus.nome} width={150} height={150} />
                            </div>
                            <div>
                                <h1 className="text-sm">Nome Civil: <span className="font-bold">{data.dados.nomeCivil}</span></h1>
                                <span className="text-sm">Nome Eleitoral: <span className="font-bold">{data.dados.ultimoStatus.nomeEleitoral}</span></span>
                                <div className="flex flex-row justify-between w-full">
                                    <p className="text-sm">Partido: <span className="font-bold">{data.dados.ultimoStatus.siglaPartido}</span></p>
                                    <p className="text-sm">UF: <span className="font-bold">{data.dados.ultimoStatus.siglaUf}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 rounded-sm border border-border p-2">
                            <div className="flex flex-row gap-3 justify-around items-center h-full">
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-bold text-2xl font-mono">Informações Pessoais</h1>
                                    <span className="text-sm">CPF: <span className="font-bold">{data.dados.cpf}</span></span>
                                    <span className="text-sm">Sexo: <span className="font-bold">{data.dados.sexo === 'M' ? 'Masculino' : 'Feminino'}</span></span>
                                    <span className="text-sm">Data de Nascimento: <span className="font-bold">{data.dados.dataNascimento}</span></span>
                                    <span className="text-sm">UF de Nascimento: <span className="font-bold">{data.dados.ufNascimento}</span></span>
                                    <span className="text-sm">Municipio de Nascimento: <span className="font-bold">{data.dados.municipioNascimento}</span></span>
                                    <span className="text-sm">Escolaridade: <span className="font-bold">{data.dados.escolaridade}</span></span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-bold text-2xl font-mono">Informações Gabinete</h1>
                                    <span className="text-sm">Sala: <span className="font-bold">{data.dados.ultimoStatus.gabinete.sala}</span></span>
                                    <span className="text-sm">Predio: <span className="font-bold">{data.dados.ultimoStatus.gabinete.predio}</span></span>
                                    <span className="text-sm">Andar: <span className="font-bold">{data.dados.ultimoStatus.gabinete.andar}</span></span>
                                    <span className="text-sm">Telefone: <span className="font-bold">{data.dados.ultimoStatus.gabinete.telefone}</span></span>
                                    <span className="text-sm">Email: <span className="font-bold">{data.dados.ultimoStatus.gabinete.email}</span></span>
                                    <Link href={`/partido/${idPartido}`} >
                                        <Button variant="secondary">Ver Informações Partido</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 ">
                        <div className="border border-border p-2 rounded-sm flex flex-col gap-1">
                            <h1 className="font-bold text-2xl font-mono">Despesas</h1>
                            <span className="text-sm">Todas as despesas deste deputado.</span>
                            <Link href={`/deputado/${id}/despesas`} >
                                <Button>Ver Despesas</Button>
                            </Link>
                        </div>
                        <div className="border border-border p-2 rounded-sm flex flex-col gap-1">
                            <h1 className="font-bold text-2xl font-mono">Discursos</h1>
                            <span className="text-sm">Todos os discursos deste deputado.</span>
                            <Link href={`/deputado/${id}/discursos`} >
                                <Button>Ver Discursos</Button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1 rounded-sm border border-border p-2">
                            <h1 className="font-bold text-2xl font-mono">Situação Eleitoral</h1>
                            <span className="text-sm">Situação: <span className="font-bold">{data.dados.ultimoStatus.situacao}</span></span>
                            <span className="text-sm">Condição Eleitoral: <span className="font-bold">{data.dados.ultimoStatus.condicaoEleitoral}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}