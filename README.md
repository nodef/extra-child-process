Useful additions to inbuilt [child_process] module.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-child-process),
📜 [Files](https://unpkg.com/extra-child-process/),
📰 [Docs](https://nodef.github.io/extra-child-process/).

This package provides **async versions of functions** (in additon to the
existing *sync* and *callback*-based functions), which are not included with the
inbuilt `child_process` module. They are named as `*Async` can be used with
`Promise`-based asynchronous programming using the `await` keyword. [spawnAsync]
is a special case here, which returns a `PromiseWithChild` which is essentially
a `Promise` with a `.child` property to allow `ChildProcess` to be directly
accessed similar to [spawn]. In addition, **callback-based functions**, such as
[exec], also **behave as async functions** when a *callback* is **not provided**.
Functions for **locating path of executable(s)** such as [which] and [whichAll]
are also included. Design was based on local ideas and [literature survey].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[child_process]: https://nodejs.org/api/child_process.html
[literature survey]: https://gist.github.com/wolfram77/d936da570d7bf73f95d1513d4368573e

<br>

```javascript
const cp = require('extra-child-process');


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
example1();


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
example2();


// 3. Locate path of node executable.
async function example3() {
  var paths = process.env.PATH.split(';');
  var exec  = await cp.which('node');
  var exec  = await cp.which('node', {paths});
  // → 'D:\\Program Files\\nodejs\\node.exe'
}
example3();


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
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [exec] | Execute a command within a shell, buffering any output. |
| [execFile] | Execute an executable without a shell by default, buffering any output. |
| [fork] | This method is a special case of `spawn` used specifically to spawn new Node.js processes. |
| [spawn] | This method spawns a new process using the given `command` and `args`. |
| [spawnAsync] | Spawn new process using given command and arguments. |
| [which] | Locate path of executable for given command. |
| [whichAll] | Locate paths of all matching executables for given command. |

<br>
<br>


## References

- [Node.js Child process API](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)
- [spawncommand package](https://www.npmjs.com/package/spawncommand)
- [async-execute package](https://www.npmjs.com/package/async-execute)
- [spawndamnit package](https://www.npmjs.com/package/spawndamnit)
- [async-child-process package](https://www.npmjs.com/package/async-child-process)
- [child-command package](https://www.npmjs.com/package/child-command)
- [exec-then package](https://www.npmjs.com/package/exec-then)
- [child-process-async package](https://www.npmjs.com/package/child-process-async)
- [faithful-exec package](https://www.npmjs.com/package/faithful-exec)
- [child-process-promise package](https://www.npmjs.com/package/child-process-promise)
- [superspawn package](https://www.npmjs.com/package/superspawn)
- [await-exec package](https://www.npmjs.com/package/await-exec)
- [command package](https://www.npmjs.com/package/command)
- [spawn-please package](https://www.npmjs.com/package/spawn-please)
- [process-promises package](https://www.npmjs.com/package/process-promises)
- [ts-process-promises package](https://www.npmjs.com/package/ts-process-promises)
- [child-process-es6-promise package](https://www.npmjs.com/package/child-process-es6-promise)
- [promise-exec package](https://www.npmjs.com/package/promise-exec)
- [promisify-child-process package](https://www.npmjs.com/package/promisify-child-process)
- [which package](https://www.npmjs.com/package/which)

<br>
<br>

[![](https://img.youtube.com/vi/QKM1o32Y2ps/maxresdefault.jpg)](https://www.youtube.com/watch?v=QKM1o32Y2ps)


[exec]: https://nodef.github.io/extra-child-process/modules.html#exec
[execFile]: https://nodef.github.io/extra-child-process/modules.html#execFile
[fork]: https://nodef.github.io/extra-child-process/modules.html#fork
[spawn]: https://nodef.github.io/extra-child-process/modules.html#spawn
[spawnAsync]: https://nodef.github.io/extra-child-process/modules.html#spawnAsync
[which]: https://nodef.github.io/extra-child-process/modules.html#which
[whichAll]: https://nodef.github.io/extra-child-process/modules.html#whichAll
