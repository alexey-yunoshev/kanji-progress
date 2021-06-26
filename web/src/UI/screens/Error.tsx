import {Link as RouterLink} from 'react-router-dom';
import React from "react";

export default function ErrorScreen() {
    return (
        <div
            style={{
                minWidth: "100wh",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <div>
                        <span>Sorry, there was an error</span>
                    </div>
                    <RouterLink to={{
                        pathname: `/`
                    }}>Go back to main</RouterLink>
                </div>
            </div>
        </div>
    )
}
