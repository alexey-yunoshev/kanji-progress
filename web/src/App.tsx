import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import {getAuth} from 'firebase/auth';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {View} from '@adobe/react-spectrum';
import {ApiProvider} from "./services/API";
import {ErrorBoundary} from "react-error-boundary";
import LoadingScreen from "./UI/screens/Loading";
import LoginScreen from "./UI/screens/Login/Login";
import Header from "./UI/shell/Header/Header";
import ContentView from "./UI/components/ContentView";

const ErrorScreen = React.lazy(() => import("./UI/screens/Error"));
const KanjiScreen = React.lazy(() => import("./UI/screens/Kanji/Kanji"));


export interface ProvidersProps {
    children: React.ReactNode,
}

function Providers({children}: ProvidersProps) {
    return (
        <Router>
            <ApiProvider>
                {children}
            </ApiProvider>
        </Router>
    )
}

function App() {
    const [isInitializing, setIsInitializing] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        // TODO find out if there's a better way to keep user from being redirected
        //  to main page after sign-in
        window.localStorage.setItem("redirectAfterSignIn", `${window.location.pathname}${window.location.search}`);
        return getAuth().onAuthStateChanged((user) => {
            setIsInitializing(false);
            setIsLoggedIn(user !== null);
        });
    }, []);

    if (isInitializing) {
        return <LoadingScreen/>
    }

    if (!isLoggedIn) {
        return (
            <Providers>
                    <ErrorBoundary
                        FallbackComponent={ErrorScreen}
                        onError={console.error}
                    >
                        <Switch>
                            <Suspense fallback={<LoadingScreen/>}>
                                <Route path="/" exact>
                                    <LoginScreen/>
                                </Route>
                            </Suspense>
                        </Switch>
                    </ErrorBoundary>
            </Providers>
        )
    }

    return (
        <Providers>
                <ErrorBoundary
                    FallbackComponent={ErrorScreen}
                    onError={console.error}
                >
                    <View
                        UNSAFE_className="unscrollable"
                        height="100vh"
                    >
                        <Header/>
                        <Switch>
                            <Suspense fallback={<LoadingScreen/>}>
                                <ContentView>
                                    <Route path="/search">
                                        <div>hello there</div>
                                    </Route>
                                    <Route path="/kanji" exact>
                                        <KanjiScreen/>
                                    </Route>
                                    <Route path="/" exact>
                                        <Redirect
                                            to="/search"
                                        />
                                    </Route>
                                </ContentView>
                            </Suspense>
                        </Switch>
                    </View>
                </ErrorBoundary>
        </Providers>

        // <div>
        //     <button
        //         onClick={() => {
        //             signOut(getAuth())
        //         }}
        //     >Sign out</button>
        // </div>
    )

    // return (
    //     <div className="App">
    //         <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo"/>
    //             <p>
    //                 Edit <code>src/App.tsx</code> and save to reload.
    //             </p>
    //             <a
    //                 className="App-link"
    //                 href="https://reactjs.org"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 Learn React
    //             </a>
    //         </header>
    //     </div>
    // );
}

export default App;
