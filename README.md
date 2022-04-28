Useful additions to inbuilt [child_process] module.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-child-process),
📜 [Files](https://unpkg.com/extra-child-process/),
📰 [Docs](https://nodef.github.io/extra-child-process/),
🔎 [Survey](https://gist.github.com/wolfram77/d936da570d7bf73f95d1513d4368573e).

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

<br>

```javascript
const cp = require('extra-child-process');
// cp.exec(command, options)
// cp.execFile(file, args, options)

async function main() {
  // With Promise:
  var {stdout, stderr} = await cp.exec('ls -a', {cwd: '/home'});
  var {stdout, stderr} = await cp.execFile('ls', ['-a'], {cwd: '/home'});

  // Without Promise:
  cp.exec('ls -a', {cwd: '/home'}, (err, stdout, stderr) => 0);
  cp.execFile('ls', ['-a'], {cwd: '/home'}, (err, stdout, stderr) => 0);
}
main();
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [exec] | Execute a command within a shell, buffering any output. |
| [execAsync] | Execute a command within a shell, buffering any output. |
| [execFile] | Execute an executable without a shell by default, buffering any output. |
| [execFileAsync] | Execute an executable without a shell by default, buffering any output. |
| [spawnAsync] | Spawn new process using given command and arguments. |
| [whichSync] | Locate path of executable for given command. |
| [whichAllSync] | Locate paths of all matching executables for given command. |
| [whichAsync] | Locate path of executable for given command. |
| [whichAllAsync] | Locate paths of all matching executables for given command. |
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

[child_process]: https://nodejs.org/api/child_process.html
[execAsync]: https://nodef.github.io/extra-child-process/modules.html#execAsync
[exec]: https://nodef.github.io/extra-child-process/modules.html#exec
[execFileAsync]: https://nodef.github.io/extra-child-process/modules.html#execFileAsync
[execFile]: https://nodef.github.io/extra-child-process/modules.html#execFile
[spawnAsync]: https://nodef.github.io/extra-child-process/modules.html#spawnAsync
[whichSync]: https://nodef.github.io/extra-child-process/modules.html#whichSync
[whichAllSync]: https://nodef.github.io/extra-child-process/modules.html#whichAllSync
[whichAsync]: https://nodef.github.io/extra-child-process/modules.html#whichAsync
[whichAllAsync]: https://nodef.github.io/extra-child-process/modules.html#whichAllAsync
[which]: https://nodef.github.io/extra-child-process/modules.html#which
[whichAll]: https://nodef.github.io/extra-child-process/modules.html#whichAll
