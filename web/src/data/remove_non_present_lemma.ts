import * as path from "path";
import * as fs from "fs";

const present = new Set(fs.readFileSync(path.resolve(__dirname, "present-lemmas.txt"), {encoding: "utf-8"})
    .split("\n").map((item) => item.trim()))

const to_write = JSON.parse(fs.readFileSync(path.resolve(__dirname, "lemma_id_index.json"), {encoding: "utf-8"}))
    .filter((item: [number, [string, number]]) => present.has(item[1][0]))

fs.writeFileSync(path.resolve(__dirname, "lemma_id_index-filtered.json"), JSON.stringify(to_write))