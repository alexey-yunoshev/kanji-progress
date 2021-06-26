import * as path from "path";
import * as fs from "fs";
import {ID, KanjiIndex, Lemma, LemmaIdIndex, LemmaKanjiPair, Rank} from "../types";

const rankedContent: Array<[string, number]> = fs.readFileSync(path.resolve(__dirname, "ranked.csv"), {encoding: "utf-8"})
    .split("\n")
    .map((line) => line.trim())
    .map((line) => {
        const elements = line.split(",");
        const lemma = elements[0];
        const rank = parseInt(elements[1]);
        return [lemma, rank]
    })

const rankedMap: Map<Lemma, Rank> = new Map(rankedContent);

const LemmaIdMap: Map<Lemma, ID> = new Map();

const IdLemmaMap: LemmaIdIndex = new Map();

let id = 0;

for (const [lemma, rank] of Array.from(rankedMap.entries())) {
    id++;

    LemmaIdMap.set(lemma, id);
    IdLemmaMap.set(id, [lemma, rank]);
}

const kanjiIndex: KanjiIndex = new Map()

const lemmaKanjiEntries: Array<LemmaKanjiPair> = JSON.parse(fs.readFileSync(path.resolve(__dirname, "lemma-kanji-map.json"), {encoding: "utf-8"}))

lemmaKanjiEntries.sort((a, b) => {
    const rankA = rankedMap.get(a['l.value']);
    const rankB = rankedMap.get(b['l.value']);

    if (rankA === undefined || rankB === undefined) {
        throw new Error("undefined rank");
    }

    return rankB - rankA;
})

lemmaKanjiEntries.forEach((item) => {
    const kanji = item['k.kanji'];
    const lemma = item['l.value'];

    let lemmaId = LemmaIdMap.get(lemma);
    if (lemmaId === undefined) {
        throw new Error(`${lemma} not present`)
    }

    if (kanjiIndex.has(kanji)) {
        kanjiIndex.get(kanji)!.push(lemmaId);
    } else {
        kanjiIndex.set(kanji, [lemmaId]);
    }
})

fs.writeFileSync(path.resolve(__dirname, "lemma_id_index.json"), JSON.stringify(Array.from(IdLemmaMap.entries())))
fs.writeFileSync(path.resolve(__dirname, "kanji_index.json"), JSON.stringify(Array.from(kanjiIndex.entries())))