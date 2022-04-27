const cp = require('child_process');


async function main() {
  var {stderr, stdout} = await cp.exec.__promisify__(`node ./process.js`, {encoding: 'utf8'});
  console.log(stdout);
}
main();
