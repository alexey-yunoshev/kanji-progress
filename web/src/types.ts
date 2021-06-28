import {ViewProps as _ViewProps} from "@react-types/view";
import React from "react";

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
export type IdLemmaIndex = Map<ID, LemmaRankPair>

export type ViewProps = _ViewProps & React.RefAttributes<import("@react-types/shared").DOMRefValue<HTMLElement>>;