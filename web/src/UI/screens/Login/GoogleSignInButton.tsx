import {MouseEventHandler} from "react";

export interface GoogleSignInButtonProps {
    onClick: MouseEventHandler,
}

export default function GoogleSignInButton({
                                               onClick,
                                           }: GoogleSignInButtonProps) {
    return (
        <button
            onClick={onClick}
            className="google"
            style={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "2px",
                color: "rgb(117, 117, 117)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                height: "40px",
                paddingLeft: "16px",
                paddingRight: "16px",
            }}
        >
            <div
                style={{
                    display: "flex"
                }}
            >
                <img
                    style={{
                        maxHeight: "20px",
                    }}
                    className="firebaseui-idp-icon"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                />
                <div
                    style={{
                        paddingLeft: "16px",
                    }}
                >
                    <span>Sign in with Google</span>
                </div>
            </div>
        </button>
    )
}