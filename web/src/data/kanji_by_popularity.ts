import * as path from "path";
import * as fs from "fs";
import {ID, Kanji} from "../types";

const filePath = path.resolve(__dirname, "kanji_index.json")
const content = fs.readFileSync(filePath, {encoding: "utf-8"})
const lemmaKanjiEntries: Array<[Kanji, Array<ID>]> = JSON.parse(content)

const kanji = lemmaKanjiEntries
    .map(([kanji, array]) => [kanji, array.length])
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([kanji]) => kanji)

fs.writeFileSync(path.resolve(__dirname, "kanji_by_popularity.json"), JSON.stringify(kanji))






