import {useRef} from "react";
import {useMediaQuery} from "react-responsive";
import {getAuth, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import GoogleSignInButton from "./GoogleSignInButton";
import ContentView from "../../components/ContentView";

export interface ProviderDatum {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: null;
    providerId: string;
}

export interface StsTokenManager {
    apiKey: string;
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}

export interface MultiFactor {
    enrolledFactors: any[];
}


export interface User {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: null;
    isAnonymous: boolean;
    tenantId: null;
    providerData: ProviderDatum[];
    apiKey: string;
    appName: string;
    authDomain: string;
    stsTokenManager: StsTokenManager;
    redirectEventId: null;
    lastLoginAt: string;
    createdAt: string;
    multiFactor: MultiFactor;
}

export interface AdditionalUserInfo {
    providerId: string;
    isNewUser: boolean;
    profile: Profile;
}

export interface Profile {
    name: string;
    granted_scopes: string;
    id: string;
    verified_email: boolean;
    given_name: string;
    locale: string;
    family_name: string;
    email: string;
    picture: string;
}


export interface Credential {
    providerId: string;
    signInMethod: string;
    oauthIdToken: string;
    oauthAccessToken: string;
}

export interface AuthResult {
    user: User;
    credential: Credential;
    operationType: "signIn";
    additionalUserInfo: AdditionalUserInfo;
}


export default function LoginScreen() {
    const loginElement = useRef<HTMLDivElement | null>(null);

    const isNarrow = useMediaQuery({
        query: '(max-width: 950px)'
    });

    function signIn() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) {
                    console.error('Credential is null')
                    return
                }

                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }


    return (
        <ContentView>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        maxWidth: "1000px",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            height: "100vh",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateAreas: "login image",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "100vh",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            marginBottom: "50px",
                                            color: "white",
                                            fontSize: "3em",
                                        }}
                                    >
                                        Kanji Progress
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "50px",
                                            color: "white",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        Learn Kanji faster by exploring words that contain the new character. The app
                                        will show
                                        you the words that contain only known to you characters in the order of
                                        popularity starting with the most common words. This way not only
                                        will you learn the new character, but you will also review the previously
                                        learned
                                        ones ^_^
                                    </div>
                                    <div>
                                        <GoogleSignInButton
                                            onClick={() => signIn()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span
                                    style={{
                                        color: "white",
                                        fontSize: "6em",
                                        textOrientation: "upright",
                                        writingMode: "vertical-rl",
                                    }}
                                >
                                    漢字進歩
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentView>
    )
}