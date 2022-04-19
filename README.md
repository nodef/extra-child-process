Useful additions to inbuilt child_process module.

```javascript
const cp = require('extra-child-process');
// cp.exec(command, options)
// cp.execFile(file, args, options)


// With Promise:
var {stdout, stderr} = await cp.exec('ls -a', {cwd: '/home'});
var {stdout, stderr} = await cp.execFile('ls', ['-a'], {cwd: '/home'});

// Without Promise:
cp.exec('ls -a', {cwd: '/home'}, (err, stdout, stderr) => 0);
cp.execFile('ls', ['-a'], {cwd: '/home'}, (err, stdout, stderr) => 0);
```
