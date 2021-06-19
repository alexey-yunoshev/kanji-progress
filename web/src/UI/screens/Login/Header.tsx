import {Flex, View} from "@adobe/react-spectrum";
import Logo from "../../components/Logo";

export default function Header() {
    return (
        <Flex
            height="size-450"
        >
            <Logo/>
        </Flex>
    )
}