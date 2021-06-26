import {getAuth, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import GoogleSignInButton from "./GoogleSignInButton";
import ContentView from "../../components/ContentView";
import {ensureUserIsInitialized} from "../../../services/API";

// export interface ProviderDatum {
//     uid: string;
//     displayName: string;
//     photoURL: string;
//     email: string;
//     phoneNumber: null;
//     providerId: string;
// }
//
// export interface StsTokenManager {
//     apiKey: string;
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
// }
//
// export interface MultiFactor {
//     enrolledFactors: any[];
// }
//
//
// export interface User {
//     uid: string;
//     displayName: string;
//     photoURL: string;
//     email: string;
//     emailVerified: boolean;
//     phoneNumber: null;
//     isAnonymous: boolean;
//     tenantId: null;
//     providerData: ProviderDatum[];
//     apiKey: string;
//     appName: string;
//     authDomain: string;
//     stsTokenManager: StsTokenManager;
//     redirectEventId: null;
//     lastLoginAt: string;
//     createdAt: string;
//     multiFactor: MultiFactor;
// }
//
// export interface AdditionalUserInfo {
//     providerId: string;
//     isNewUser: boolean;
//     profile: Profile;
// }
//
// export interface Profile {
//     name: string;
//     granted_scopes: string;
//     id: string;
//     verified_email: boolean;
//     given_name: string;
//     locale: string;
//     family_name: string;
//     email: string;
//     picture: string;
// }
//
//
// export interface Credential {
//     providerId: string;
//     signInMethod: string;
//     oauthIdToken: string;
//     oauthAccessToken: string;
// }
//
// export interface AuthResult {
//     user: User;
//     credential: Credential;
//     operationType: "signIn";
//     additionalUserInfo: AdditionalUserInfo;
// }


export default function LoginScreen() {

    function signIn() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) {
                    alert("Sorry, there was an error")
                    console.error('Credential is null')
                    return
                }
                ensureUserIsInitialized()
                    .then(() => {
                        console.log("User initialized");
                    }).catch(() => {
                    alert("Sorry, there was a problem initializing the user, please sign in later.")
                })
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
            alert("Sorry, there was a problem authenticating, please try again later.")
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
                                gridTemplateColumns: "2fr 1fr",
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