import DespesasDeputado from "@/components/deputado/Despesas";
import NavBar from "@/components/navbar/Nav";

export default function Despesas({ params }: { params: { id: string } }) {
    return (
        <div>
            <NavBar />
            <DespesasDeputado id={params.id} />
        </div>
    )
}