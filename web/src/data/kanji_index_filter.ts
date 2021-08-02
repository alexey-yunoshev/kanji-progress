import * as path from "path";
import * as fs from "fs";

const present = new Set(JSON.parse(fs.readFileSync(path.resolve(__dirname, "lemma_id_index-filtered.json"), {encoding: "utf-8"}))
    .map((item: [number, [string, number]]) => item[0]))

const to_write = JSON.parse(fs.readFileSync(path.resolve(__dirname, "kanji_index.json"), {encoding: "utf-8"}))
    .map((item: [number, Array<number>]) => {
        const newIds: Array<number> = []

        for (const id of item[1]) {
            if (present.has(id)) {
                newIds.push(id);
            }
        }

        return [item[0], newIds]
    })
    .filter((item: [number, Array<number>]) => item[1].length > 0)

fs.writeFileSync(path.resolve(__dirname, "kanji_index-filtered.json"), JSON.stringify(to_write))