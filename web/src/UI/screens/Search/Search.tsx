import {updateUserKanji, useApiProvider} from "../../../services/API";
import {Kanji, Lemma} from "../../../types";
import {findLemmas, useGetAllKanji, useGetIdLemmaIndex, useGetKanjiIndex} from "../../../services/kanji/kanji";
import "./index.css"
import {useState} from "react";

interface LemmaTileProps {
    lemma: Lemma,
    isActive: boolean,
}

function LemmaTile({
                       lemma,
                       isActive
                   }: LemmaTileProps) {

    let className = 'lemma';
    if (isActive) {
        className += " lemma-active"
    }

    return (
        <div
            className={className}
            onClick={() => navigator.clipboard.writeText(lemma)}
        >
            {lemma}
        </div>
    )
}


export default function SearchScreen() {
    const allKanji = useGetAllKanji();
    const availableKanji = new Set(allKanji);
    const kanjiIndex = useGetKanjiIndex()
    const idLemmaIndex = useGetIdLemmaIndex()

    const {
        useUserKanji,
    } = useApiProvider()

    const {
        userKanji,
        setUserKanji,
    } = useUserKanji();

    const userKanjiSet = new Set(userKanji);

    const [kanjiInput, setKanjiInput] = useState<Array<Kanji>>([]);


    const onKanjiInputChange = (value: string) => {
        const chars: Array<Kanji> = [];
        const otherChars: Array<string> = [];

        const originalChars = Array.from(new Set(value.split("")))
        for (const char of originalChars) {
            if (availableKanji.has(char)) {
                chars.push(char);
            } else {
                otherChars.push(char)
            }
        }

        if (otherChars.length > 0) {
            alert(`These characters are not in the library: ${otherChars.join(", ")}`)
        }

        const newCharacters: Array<Kanji> = [];

        for (const char of chars) {
            if (!userKanjiSet.has(char)) {
                newCharacters.push(char);
            }
        }

        if (newCharacters.length > 0) {
            const newUserKanji = [...(userKanji || []), ...newCharacters];
            setUserKanji(newUserKanji);
            updateUserKanji(newUserKanji);
        }

        setKanjiInput(chars);
    }

    const userKnowsAllKanjiInLemma = (lemma: string): boolean => {
        for (const char of lemma) {
            if (
                availableKanji.has(char)
                && !userKanjiSet.has(char)
            ) {
                return false
            }
        }

        return true;
    }

    if (
        kanjiIndex === null
        || idLemmaIndex === null
    ) {
        return <div>"Loading..."</div>
    }

    const lemmaPairs = findLemmas(
        kanjiIndex,
        idLemmaIndex,
        kanjiInput,
    );

    return (
        <div
            style={{
                padding: "5em",
                gap: "1em",
                height: "100%",
                overflowY: "scroll",
            }}
            className="custom-scroll-bar"
        >
            <input
                type="text"
                value={kanjiInput.join("")}
                onChange={({target: {value}}) => {
                    onKanjiInputChange(value);
                }}
                style={{
                    border: "none",
                    borderRadius: "1em",
                    height: "2em",
                    paddingLeft: "1em",
                    backgroundColor: "#ffcfed",
                    fontSize: "1.4em",
                    outline: "none",
                    color: "#0c4a64",
                    position: "sticky",
                    top: 0,
                    textShadow: "1px 1px 4px rgb(0 0 0 / 25%)",
                    boxShadow: "0px 2px 4px rgb(0 0 0 / 10%)",
                }}
            />

            <div
                style={{
                    display: "flex",
                    paddingBottom: "1em",
                    paddingTop: "1em",
                    flexWrap: "wrap",
                    gap: "1em",
                    overflowY: "scroll",
                }}
                className="custom-scroll-bar"
            >
                {
                    lemmaPairs.map(([lemma]) => (
                        <LemmaTile
                            lemma={lemma}
                            isActive={userKnowsAllKanjiInLemma(lemma)}
                            key={lemma}
                        />
                    ))
                }
            </div>
        </div>
    )
}
