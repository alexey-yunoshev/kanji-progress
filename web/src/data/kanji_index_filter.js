"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var present = new Set(JSON.parse(fs.readFileSync(path.resolve(__dirname, "lemma_id_index-filtered.json"), { encoding: "utf-8" }))
    .map(function (item) { return item[0]; }));
var to_write = JSON.parse(fs.readFileSync(path.resolve(__dirname, "kanji_index.json"), { encoding: "utf-8" }))
    .map(function (item) {
    var newIds = [];
    for (var _i = 0, _a = item[1]; _i < _a.length; _i++) {
        var id = _a[_i];
        if (present.has(id)) {
            newIds.push(id);
        }
    }
    return [item[0], newIds];
})
    .filter(function (item) { return item[1].length > 0; });
fs.writeFileSync(path.resolve(__dirname, "kanji_index-filtered.json"), JSON.stringify(to_write));
