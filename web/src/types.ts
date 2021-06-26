export type Lemma = string
export type Rank = number
export type ID = number
export type Kanji = string

export interface LemmaKanjiPair {
    'k.kanji': string
    'l.value': string
}

export type LemmaRankPair = [Lemma, Rank]
export type KanjiIndex = Map<Kanji, Array<ID>>
export type LemmaIdIndex = Map<ID, LemmaRankPair>
