import {useApiProvider} from "../../../services/API";
import {Kanji} from "../../../types";
import {allKanji} from "../../../services/kanji/kanji";
import "./index.css"

interface KanjiTileProps {
    kanji: Kanji,
    isActive: boolean,
}

function KanjiTile({
                       kanji,
                       isActive
                   }: KanjiTileProps) {

    let className = 'k';
    if (isActive) {
        className += " a"
    }

    return (
        <div
            className={className}
        >
            {kanji}
        </div>
    )
}

export default function KanjiScreen() {

    const {
        useUserKanji,
    } = useApiProvider()

    const {userKanji} = useUserKanji();
    const userKanjiSet = new Set(userKanji);


    return (
        <div
            style={{
                display: "flex",
                padding: "5em",
                flexWrap: "wrap",
                gap: "1em",
                height: "100%",
                overflowY: "scroll",
            }}
            className="custom-scroll-bar"
        >
            {
                (allKanji || []).map((kanji) => (
                    <KanjiTile
                        key={kanji}
                        kanji={kanji}
                        isActive={userKanjiSet.has(kanji)}
                    />
                ))
            }
        </div>
    )
}