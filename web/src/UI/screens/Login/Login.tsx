import {useRef} from "react";
import {useMediaQuery} from "react-responsive";
import {getAuth, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import {Flex, Grid, View} from "@adobe/react-spectrum";
import GoogleSignInButton from "./GoogleSignInButton";

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
        <View
            UNSAFE_style={{
                background: "linear-gradient(37deg, rgba(241,184,190,1) 0%, rgba(249,173,205,1) 51%, rgba(241,184,213,1) 100%)"
            }}
        >
            <Flex
                justifyContent="center"
            >
                <View
                    maxWidth="1000px"
                    width="100%"
                >
                    <View
                        height="100vh"
                        paddingX="size-400"
                        width="100%"
                    >
                        <Grid
                            areas={[
                                "login", "image"
                            ]}
                            columns={["1fr", "1fr"]}
                            rows={["100vh"]}
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                            >
                                <View>
                                    <View
                                        marginBottom="size-200"
                                        UNSAFE_style={{
                                            color: "white",
                                            fontSize: "3em",
                                        }}
                                    >
                                        Kanji Progress
                                    </View>
                                    <View
                                        marginBottom="size-450"
                                        UNSAFE_style={{
                                            color: "white",
                                            fontSize: "1.5em",
                                        }}
                                    >
                                        Learn Kanji faster by exploring words that contain the new character. The app will show
                                        you the words that contain only known to you characters in the order of popularity starting with the most common words. This way not only
                                        will you learn the new character, but you will also review the previously learned
                                        ones ^_^
                                    </View>
                                    <View>
                                        <GoogleSignInButton
                                            onClick={() => signIn()}
                                        />
                                    </View>
                                </View>
                            </Flex>
                            <Flex
                                alignItems="center"
                                justifyContent="center"
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
                            </Flex>
                        </Grid>
                    </View>
                </View>
            </Flex>
        </View>
    )
}