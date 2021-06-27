import {kanjiIndex} from "./kanjiIndex";
import {ID, Kanji, LemmaRankPair} from "../../types";
import {idLemmaIndex} from "./id_lemma_index";

function intersection<T>(sets: Array<Set<T>>): Set<T> {
    const result = new Set<T>();
    if (sets.length === 0) {
        return result;
    }

    valueLoop:
    for (const value of Array.from(sets[0].values())) {
        for (const set of sets.slice(1)) {
            if (!set.has(value)) {
                continue valueLoop
            }
        }
        result.add(value);
    }

    return result;
}

export const allKanji = Array.from(kanjiIndex.keys());

export function findLemmas(kanji: Array<Kanji>): Array<LemmaRankPair> {
    if (kanji.length === 0) {
        return [];
    }

    if (kanji.length === 1) {
        const lemmaIds: Array<ID> = kanjiIndex.get(kanji[0]) || [];
        const entries: Array<LemmaRankPair> = []

        for (const id of lemmaIds) {
            const pair = idLemmaIndex.get(id);
            if (pair !== undefined) {
                entries.push(pair);
            }
        }

        return entries;
    } else {
        const entries: Array<LemmaRankPair> = []

        const allLemmaIds: Array<Set<ID>> = [];

        for (const kanjiValue of kanji) {
            allLemmaIds.push(new Set(kanjiIndex.get(kanjiValue) || []))
        }

        for (const id of Array.from(intersection(allLemmaIds))) {
            const pair = idLemmaIndex.get(id);
            if (pair !== undefined) {
                entries.push(pair);
            }
        }

        entries.sort((a, b) => b[1] - a[1]);
        return entries;
    }
}
