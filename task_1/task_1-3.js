/** class implementation of task_1-2 */
const fs = require('fs')
const csv = require("csvtojson");

class Converter{
  constructor(csvFilePath, txtDirectoryName, txtFileName){
    this.csvFilePath = csvFilePath
    this.txtDirectoryName = txtDirectoryName
    this.txtFileName = txtFileName
    this.writable =  fs.createWriteStream(txtFileName, 'utf-8')
  }

  _createDirectory() {
    fs.exists(this.txtDirectoryName, exists => exists ? null : fs.mkdirSync(hhis.txtDirectoryName));
  }

  _writeFile(json) {
    return this.writable.write(`${JSON.stringify(json)}\n`);
  }

  run() {
    this._createDirectory()
    csv()
      .fromFile(this.csvFilePath)
      .subscribe(
        json => this._writeFile(json),
        error => console.error(error)
    );
  }

}

const converter = new Converter('./csv/username.csv', 'txt', './txt/username_1-3.txt')
converter.run()

/** class implementation of task_1-1 */
class IOReverter{
    _reverseString(chunk) {
      return Array.from(chunk).reverse().join('')
    }

    _writeOut(reversedString) {
      process.stdout.write(`${reversedString}\n`);
    }

    run() {
      process.stdin.setEncoding('utf8');
      process.stdin.on('readable', () => {
        let chunk = null

        while (null !== (chunk = process.stdin.read())) {
          const reversedString = this._reverseString(chunk)
          this._writeOut(reversedString)
        }
      });
    }
}

const reverter = new IOReverter()
reverter.run()
