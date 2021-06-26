import Logo from "../../components/Logo";

export default function Header() {
    return (
        <div
            style={{
                display: "flex",
                height: "70px"
            }}
        >
            <Logo/>
        </div>
    )
}