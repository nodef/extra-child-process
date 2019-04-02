const cp = require('child_process');



const exec = cp.exec;
const execFile = cp.execFile;



function cpExec(command, options, callback) {
  if(typeof callback==='function' || typeof options==='function') return exec(command, options, callback);
  return new Promise((fres, frej) => exec(command, options, (err, stdout, stderr) => {
    return err? frej(Object.assign(err, {stderr})):fres({stdout, stderr});
  }));
}

function cpExecFile(file, args, options, callback) {
  if(typeof callback==='function' || typeof options==='function' || typeof args==='function') return execFile(file, args, options, callback);
  return new Promise((fres, frej) => execFile(file, args, options, (err, stdout, stderr) => {
    return err? frej(Object.assign(err, {stderr})):fres({stdout, stderr});
  }));
}



cp.exec = cpExec;
cp.execFile = cpExecFile;
module.exports = cp;
