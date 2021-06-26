import {ViewProps} from "../../types";

export default function ContentView({
                                        children,
                                    }: ViewProps) {
    return (
        <div
            style={{
                height: "100%",
                background: "linear-gradient(37deg, rgba(241,184,190,1) 0%, rgba(249,173,205,1) 51%, rgba(241,184,213,1) 100%)",
            }}
            className={"unscrollable"}
        >
            {children}
        </div>
    )
}
