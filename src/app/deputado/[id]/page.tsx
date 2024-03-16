import DeputadoContainer from "@/components/deputado/Deputado";
import NavBar from "@/components/navbar/Nav";

export default function Deputado({ params }: { params: { id: string } }) {

    return (
        <div>
            <NavBar />
            <DeputadoContainer id={params.id} />
        </div>
    )
}