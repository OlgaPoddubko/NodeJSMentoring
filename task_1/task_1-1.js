process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  while (null !== (chunk = process.stdin.read())) {
    const reversedString = Array.from(chunk).reverse().join('')
    process.stdout.write(`${reversedString}\n`);
  }
});
