import { ModeToggle } from "../toggle-theme";

interface NavBarProps {

}
export default function NavBar(props: NavBarProps) {
    return (
        <nav className="w-full h-20 border-b border-b-border">
            <div className="w-[80dvw] mx-auto h-full flex items-center justify-between">
                <div>a</div>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}