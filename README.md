Promise interface for child_process.

```javascript
const cp = require('extra-cp');
// cp.exec(command, options)
// cp.execFile(file, args, options)


// With Promise:
var {err, stdout, stderr} = await cp.exec('ls -a', {cwd: '/home'});
var {err, stdout, stderr} = await cp.execFile('ls', ['-a'], {cwd: '/home'});

// Without Promise:
cp.exec('ls -a', {cwd: '/home'}, (err, stdout, stderr) => 0);
cp.execFile('ls', ['-a'], {cwd: '/home'}, (err, stdout, stderr) => 0);
```
