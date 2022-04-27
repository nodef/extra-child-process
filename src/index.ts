import * as C from "child_process";
import {ExecException} from "child_process";
import {ChildProcess, PromiseWithChild} from "child_process";
import {ExecSyncOptions, ExecFileSyncOptions} from "child_process";
import {SpawnSyncOptions, SpawnSyncReturns} from "child_process";




// TYPES
// =====

export {ChildProcess} from "child_process";
export {ChildProcessByStdio} from "child_process";
export {ChildProcessWithoutNullStreams} from "child_process";
export {CommonExecOptions} from "child_process";
export {CommonOptions} from "child_process";
export {CommonSpawnOptions} from "child_process";
export {ExecException} from "child_process";
export {ExecFileException} from "child_process";
export {ExecFileOptions} from "child_process";
export {ExecFileOptionsWithBufferEncoding} from "child_process";
export {ExecFileOptionsWithOtherEncoding} from "child_process";
export {ExecFileOptionsWithStringEncoding} from "child_process";
export {ExecFileSyncOptions} from "child_process";
export {ExecFileSyncOptionsWithBufferEncoding} from "child_process";
export {ExecFileSyncOptionsWithStringEncoding} from "child_process";
export {ExecOptions} from "child_process";
export {ExecOptionsWithBufferEncoding} from "child_process";
export {ExecOptionsWithStringEncoding} from "child_process";
export {ForkOptions} from "child_process";
export {IOType} from "child_process";
export {MessageOptions} from "child_process";
export {MessagingOptions} from "child_process";
export {ProcessEnvOptions} from "child_process";
export {PromiseWithChild} from "child_process";
export {SendHandle} from "child_process";
export {Serializable} from "child_process";
export {SerializationType} from "child_process";
export {SpawnOptions} from "child_process";
export {SpawnOptionsWithStdioTuple} from "child_process";
export {SpawnOptionsWithoutStdio} from "child_process";
export {SpawnSyncOptions} from "child_process";
export {SpawnSyncOptionsWithBufferEncoding} from "child_process";
export {SpawnSyncOptionsWithStringEncoding} from "child_process";
export {SpawnSyncReturns} from "child_process";
export {StdioNull} from "child_process";
export {StdioOptions} from "child_process";
export {StdioPipe} from "child_process";
export {StdioPipeNamed} from "child_process";




// METHODS
// =======

// export {exec} from "child_process";
// export {execFile} from "child_process";
export {execFileSync} from "child_process";
export {execSync} from "child_process";
export {fork} from "child_process";
// export {spawn} from "child_process";
export {spawnSync} from "child_process";




// EXEC
// ----

/** Return value from exec*Async(). */
export interface ExecAsyncReturns {
  /** Standard output written by child process. */
  stdout: string,
  /** Standard error written by child process. */
  stderr: string,
}


/** Callback for exec*(). */
export type ExecCallback = (error: ExecException, stdout: string, stderr: string) => void;


/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function execAsync(command: string, options?: ExecSyncOptions): PromiseWithChild<ExecAsyncReturns> {
  var fresolve = null, freject = null;
  var child = C.exec(command, options, (err, stdout, stderr) => {
    if (err != null) freject(Object.assign(err, {stdout, stderr}));
    else fresolve({stdout, stderr});
  });
  var promise: Promise<ExecAsyncReturns> = new Promise((resolve, reject) => {
    fresolve = resolve;
    freject  = reject;
  });
  return Object.assign(promise, {child});
}


/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param callback callback function (err, stdout, stderr)
 * @returns child process (if callback provided), else output {stdout, stderr} (promise)
 */
export function exec(command: string, callback: ExecCallback): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param options options {cwd, env, ...}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process (if callback provided), else output {stdout, stderr} (promise)
 */
export function exec(command: string, options: ExecSyncOptions, callback: ExecCallback): PromiseWithChild<ExecAsyncReturns>;

export function exec(command: string, options: ExecSyncOptions | ExecCallback, callback?: ExecCallback): C.ChildProcess | PromiseWithChild<ExecAsyncReturns> {
  if (typeof callback==="function") return C.exec(command, options as ExecSyncOptions, callback);
  if (typeof options ==="function") return C.exec(command, options);
  return execAsync(command, options);
}




// EXEC-FILE
// ---------

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function execFileAsync(file: string, options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function execFileAsync(file: string, args: string[], options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

export function execFileAsync(file: string, args?: string[] | ExecFileSyncOptions, options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns> {
  var fresolve = null, freject = null, child: ChildProcess = null;
  var callback = (err: ExecException, stdout: string, stderr: string) => {
    if (err != null) freject(err);
    else fresolve({stdout, stderr});
  };
  if (typeof args==="undefined")  child = C.execFile(file, callback);
  else if (args instanceof Array) child = C.execFile(file, args, options, callback);
  var promise: Promise<ExecAsyncReturns> = new Promise((resolve, reject) => {
    fresolve = resolve;
    freject  = reject;
  });
  return Object.assign(promise, {child});
}


/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param callback callback function (err, stdout, stderr)
 * @returns child process (if callback provided), else output {stdout, stderr} (promise)
 */
export function execFile(file: string, callback: ExecCallback): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param options options {cwd, env, ...}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process (if callback provided), else output {stdout, stderr} (promise)
 */
export function execFile(file: string, options: ExecFileSyncOptions, callback: ExecCallback): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param callback callback function (err, stdout, stderr)
 * @returns child process (if callback provided), else output {stdout, stderr} (promise)
 */
export function execFile(file: string, args: string[], callback: ExecCallback): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param options options {cwd, env, ...}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process (if callback provided), else output {stdout, stderr} (promise)
 */
export function execFile(file: string, args: string[], options: ExecFileSyncOptions, callback: ExecCallback): PromiseWithChild<ExecAsyncReturns>;

export function execFile(file: string, args: string[] | ExecFileSyncOptions | ExecCallback, options?: ExecFileSyncOptions | ExecCallback, callback?: ExecCallback): ChildProcess | PromiseWithChild<ExecAsyncReturns> {
  if (typeof callback==="function") return C.execFile(file, args as string[], options as ExecFileSyncOptions, callback);
  if (typeof options ==="function") return C.execFile(file, args as any, options);
  if (typeof args==="function")     return C.execFile(file, args);
  return execFileAsync(file, args as any, options);
}




// SPAWN
// -----

/** Default buffer limit. */
const BUFFER_LIMIT = 1024 * 1024;


/**
 * Combine list of strings or buffers.
 * @param data list of strings or buffers
 * @param encoding data encoding (utf8, ...)
 * @returns combined string or buffer
 */
function concatData(data: string[] | Buffer[], encoding: BufferEncoding | "buffer") {
  if (data.length > 0) return typeof data[0]==="string"? data.join("") : Buffer.concat(data as Buffer[]);
  return encoding!=null && encoding!=="buffer"?          data.join("") : Buffer.concat(data as Buffer[]);
}


/**
 * Execute an executable without a shell by default, buffering any output.
 * @param command command to run
 * @param options options {cwd, env, ...}
 * @returns output {pid, output, stdout, stderr, status, signal}
 */
export function spawnAsync(command: string, options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param command command to run
 * @param args list of arguments
 * @param options options {cwd, env, ...}
 * @returns output {pid, output, stdout, stderr, status, signal}
 */
export function spawnAsync(command: string, args: string[], options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>>;

export function spawnAsync(command: string, args?: string[] | SpawnSyncOptions, options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>> {
  var stdouts = [], stdout_size = 0;
  var stderrs = [], stderr_size = 0;
  var _options: SpawnSyncOptions = args instanceof Array? options : args;
  var child: ChildProcess = null;
  if (args instanceof Array) child = C.spawn(command, args, options);
  else child = C.spawn(command, args as SpawnSyncOptions);
  var encoding = _options && _options.encoding? _options.encoding : null;
  if (encoding!=null && encoding!=="buffer") child.stdout.setEncoding(encoding);
  if (encoding!=null && encoding!=="buffer") child.stderr.setEncoding(encoding);
  child.stdout.on('data', chunk => {
    if (stdout_size + chunk.length > BUFFER_LIMIT) return;
    stdouts.push(chunk);
    stdout_size += chunk.length;
  });
  child.stderr.on('data', chunk => {
    if (stderr_size + chunk.length > BUFFER_LIMIT) return;
    stderrs.push(chunk);
    stderr_size += chunk.length;
  });
  var promise: Promise<SpawnSyncReturns<string | Buffer>> = new Promise((resolve, reject) => {
    child.on('error', err => {
      var {pid, exitCode, signalCode} = child;
      var stdout = concatData(stdouts, encoding);
      var stderr = concatData(stderrs, encoding);
      var output = [null, stdout, stderr];
      reject(Object.assign(err, {pid, output, stdout, stderr, status: exitCode, signal: signalCode}));
    });
    child.on('close', (code, signal) => {
      var {pid} = child;
      var stdout = concatData(stdouts, encoding);
      var stderr = concatData(stderrs, encoding);
      var output = [null, stdout, stderr];
      resolve({pid, output, stdout, stderr, status: code, signal});
    });
  });
  return Object.assign(promise, {child});
}
