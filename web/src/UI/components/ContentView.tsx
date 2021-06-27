import {ViewProps} from "../../types";

export default function ContentView({
                                        children,
                                    }: ViewProps) {
    return (
        <div
            style={{
                height: "100%",
                background: "var(--background-gradient)",
            }}
            className={"unscrollable"}
        >
            {children}
        </div>
    )
}
