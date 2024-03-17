import NavBar from "@/components/navbar/Nav";
import PartidoById from "@/components/partido/id/PartidoById";

export default function Partido({ params }: { params: { id: string } }) {
    return (
        <div>
            <NavBar />
            <PartidoById id={params.id} />
        </div>
    )
}