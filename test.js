const cp = require('./');


// 1. List files in current directory.
async function example1() {
  var {stdout, stderr} = await cp.exec('ls -a');
  var {stdout, stderr} = await cp.execFile('ls', ['-a']);
  cp.exec('ls -a', (err, stdout, stderr) => 0);
  cp.execFile('ls', ['-a'], (err, stdout, stderr) => 0);
  // → .
  // → ..
  // → .build
  // → .git
  // → .github
  // → ...
}
// example1();


// 2. List files in 'src' directory.
async function example2() {
  var {stdout, stderr} = await cp.exec('ls -a', {cwd: 'src'});
  var {stdout, stderr} = await cp.execFile('ls', ['-a'], {cwd: 'src'});
  cp.exec('ls -a', {cwd: 'src'}, (err, stdout, stderr) => 0);
  cp.execFile('ls', ['-a'], {cwd: 'src'}, (err, stdout, stderr) => 0);
  // → .
  // → ..
  // → index.ts
}
// example2();


// 3. Locate path of node executable.
async function example3() {
  var paths = process.env.PATH.split(';');
  var exec  = await cp.which('node');
  var exec  = await cp.which('node', {paths});
  // → 'D:\\Program Files\\nodejs\\node.exe'
}
// example3();


// 4. Locate path of n*e executables.
async function example4() {
  var paths = process.env.PATH.split(';');
  var execs = await cp.whichAll(/^n.*?e$/);
  var execs = await cp.whichAll(/^n.*?e$/, {paths});
  // → [
  // →   'D:\\Program Files\\Git\\usr\\bin\\nice.exe',
  // →   'C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.2\\bin\\nvprune.exe',
  // →   'D:\\Program Files\\nodejs\\node.exe'
  // → ]
}
example4();
