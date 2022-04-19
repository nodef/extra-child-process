const cp = require('child_process');


function main() {
  var x = cp.execSync(`node ./process.js`, {encoding: 'utf8'});
  console.log(x);
}
main();
