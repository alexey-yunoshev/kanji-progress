import React from "react";
import {getAuth, signOut} from "firebase/auth";

function SignOutIcon() {
    return (
        <svg version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             x="0px"
             y="0px"
             viewBox="0 0 512 512"
             width="22px"
             style={{
                 transform: "translateY(1px)",
                 backgroundColor: "transparent",
                 fill: "var(--primary-text-color)",
             }}
        >
            <path d="M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15
			c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724
			c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262
			C276.412,478.129,266.908,468.625,255.15,468.625z"/>
            <path d="M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173
			H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173
			c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575
			c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z"/>
        </svg>
    )
}

function SignOutButton() {
    return (
        <button
            style={{
                height: "30px",
                width: "30px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
            }}
            onClick={() => {
                signOut(getAuth());
                window.location.assign("/");
            }}
            title="sign out"
        >
            <SignOutIcon/>
        </button>
    )
}

export default SignOutButton