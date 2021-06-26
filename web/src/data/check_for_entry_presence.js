const got = require('got');
const fs = require('fs');
const path = require('path');


async function main() {
    const filePath = path.resolve(__dirname, "lemma-kanji-map.json");
    const content = fs.readFileSync(filePath, {encoding: "utf-8"});
    const items = JSON.parse(content);

    const lemmas = new Set();

    for (const item of items) {
        lemmas.add(item["l.value"])
    }

    const lemmasArray = Array.from(lemmas.values())
    lemmasArray.sort();

    const presentLemmas = new Set();
    const targetFilePath = path.resolve(__dirname, "present-kanji.txt");
    const fh = fs.openSync(targetFilePath, "w")

    const len = lemmasArray.length;
    let i = 0
    for (const lemma of lemmasArray) {
        i++;
        try {
            console.log(`${i}/${len}`)
            await got(`https://kotobank.jp/jeword/${lemma}`);
            fs.writeSync(fh, `${lemma}\n`)
        } catch (e) {
            if (e.message !== 'Response code 404 (Not Found)') {
                throw e;
            }
        }

    }
    const arr = Array.from(presentLemmas.values());
    console.log(arr)
    fs.closeSync(fh)

    console.log(1);
}

main()
