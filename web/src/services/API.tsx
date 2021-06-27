import {runTransaction, getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAuth, User} from "firebase/auth";
import {Kanji} from "../types";


export function useGetUser() {
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        const auth = getAuth();
        setUser(auth.currentUser);
    }, [])

    return user
}

export interface UserEntry {
    kanji: string
}

export async function ensureUserIsInitialized() {
    const db = getFirestore();

    const user = getAuth().currentUser;

    if (user == null) {
        console.error("No user");
        return;
    }

    const docRef = doc(db, "users", user.uid);

    await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(docRef);
        if (!snapshot.exists()) {
            const entry: UserEntry = {
                kanji: "",
            }
            transaction.set(docRef, entry)
        }
    });
}

export async function getUserEntry(): Promise<UserEntry | null> {
    const db = getFirestore();

    const user = getAuth().currentUser;

    if (user == null) {
        console.error("No user");
        return null;
    }

    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserEntry;
    } else {
        return null
    }
}

type OptionalUserKanji = Array<Kanji> | null;

export interface UseUserKanjiResult {
    userKanji: OptionalUserKanji,
    setUserKanji: React.Dispatch<OptionalUserKanji>,
}

export function useUserKanji(): UseUserKanjiResult {
    const [userKanji, setUserKanji] = useState<OptionalUserKanji>(null);

    useEffect(() => {
        getUserEntry()
            .then((entry) => {
                if (entry === null) {
                    return
                }

                setUserKanji(entry.kanji.split(""))
            })

    }, []);

    return {
        userKanji,
        setUserKanji,
    }
}

export function updateUserKanji(kanji: Array<Kanji>) {
    const db = getFirestore();
    const user = getAuth().currentUser;

    if (user == null) {
        console.error("No user");
        return null;
    }

    const docRef = doc(db, "users", user.uid);
    return updateDoc(docRef, {kanji: kanji.join("")});
}

const defaultContext = {
    useUserKanji,
}

export type ApiProviderInterface = typeof defaultContext;

export const Context = createContext<ApiProviderInterface | null>(defaultContext);


export function ApiProvider({children}: any) {
    return (
        <Context.Provider value={defaultContext}>
            {children}
        </Context.Provider>
    )
}

export function useApiProvider(): ApiProviderInterface {
    return useContext(Context) as ApiProviderInterface;
}
