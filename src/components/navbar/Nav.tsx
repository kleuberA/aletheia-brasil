import Link from "next/link";
import { ModeToggle } from "../toggle-theme";

interface NavBarProps {

}
export default function NavBar(props: NavBarProps) {
    return (
        <nav className="w-full h-20 border-b border-b-border">
            <div className="w-[80dvw] mx-auto h-full flex items-center justify-between">
                <Link href="/" className="flex flex-row gap-2 items-center group">
                    <h1>Aletheia</h1>
                    <h2 className="bg-blue-400 p-1 rounded-sm group-hover:-rotate-45 transition-all duration-300">Brasil</h2>
                </Link>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}