"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var present = new Set(fs.readFileSync(path.resolve(__dirname, "present-lemmas.txt"), { encoding: "utf-8" })
    .split("\n").map(function (item) { return item.trim(); }));
var to_write = JSON.parse(fs.readFileSync(path.resolve(__dirname, "lemma_id_index.json"), { encoding: "utf-8" }))
    .filter(function (item) { return present.has(item[1][0]); });
fs.writeFileSync(path.resolve(__dirname, "lemma_id_index-filtered.json"), JSON.stringify(to_write));
