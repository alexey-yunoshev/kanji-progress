import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    initializeApp,
    getApps,
} from "firebase/app"
import {
    getAuth,
    useAuthEmulator as emulateAuth,
} from "firebase/auth"
import {
    getFirestore,
    useFirestoreEmulator as emulateFirestore,
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyCDIuciJNPxbZdLuCFqef1Bu_03SEvywLU",
    authDomain: "kanji-progress.firebaseapp.com",
    projectId: "kanji-progress",
    storageBucket: "kanji-progress.appspot.com",
    messagingSenderId: "994297511727",
    appId: "1:994297511727:web:b895f710e93e7b89beebda",
    measurementId: "G-FHXCFE07HT"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);

    if (window.location.hostname === "localhost") {
        emulateAuth(
            getAuth(),
            'http://localhost:9099/',
            {disableWarnings: true},
        );
        emulateFirestore(
            getFirestore(),
            "localhost",
            8080,
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
