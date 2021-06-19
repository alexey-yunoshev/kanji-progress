import React from "react";

export default function LoadingScreen() {
    return (
        <div
            style={{
                alignItems: "center",
                backgroundColor: "#f1b8be",
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
                >Kanji Progress</div>
            </div>
        </div>
    )
}
