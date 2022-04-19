import {ExecOptions, ExecFileOptions} from "child_process";
import * as C from "child_process";


export interface ExecResult {
  stdout: string,
  stderr: string,
}


export function execAsync(command: string, options?: ExecOptions): Promise<ExecResult> {
  return new Promise((resolve, reject) => {
    C.exec(command, options, (err, stdout, stderr) => {
      if (err != null) reject(Object.assign(err, {stdout, stderr}));
      else resolve({stdout, stderr});
    });
  });
}


export function execFileAsync(file: string, args?: readonly string[], options?: ExecFileOptions) {
  return new Promise((resolve, reject) => {
    var x = C.execFile(file, args, options, (err, stdout, stderr) => {
      if (err != null) reject(Object.assign(err, {stdout, stderr}));
      else resolve({stdout, stderr});
    });
  });
}
