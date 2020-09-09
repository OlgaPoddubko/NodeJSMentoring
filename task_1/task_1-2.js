const fs = require('fs')
const csv = require("csvtojson");

fs.exists('txt', exists => exists ? null : fs.mkdirSync('txt'));
const writable = fs.createWriteStream('./txt/username_1-2.txt', 'utf-8')

csv()
  .fromFile('./csv/username.csv')
  .subscribe(
    json => {
      writable.write(`${JSON.stringify(json)}\n`);
    },
    error => console.error(error)
);
