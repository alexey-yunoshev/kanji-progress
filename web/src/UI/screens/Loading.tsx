import React from "react";

export default function LoadingScreen() {
    return (
        <div
            style={{
                alignItems: "center",
                background: "linear-gradient(37deg, rgb(224 184 241) 0%, rgb(249 173 235) 51%, rgb(241 184 207) 100%)",
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
                minWidth: "100%",
            }}
        >
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        color: "white",
                        fontSize: "4em",
                        fontWeight: "bold",
                        textShadow: "1px 1px 4px rgb(0 0 0 / 25%)",
                    }}
                >...</div>
            </div>
        </div>
    )
}
