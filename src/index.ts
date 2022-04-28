import {ExecException} from "child_process";
import {ChildProcess, PromiseWithChild}       from "child_process";
import {ExecSyncOptions, ExecFileSyncOptions} from "child_process";
import {SpawnSyncOptions, SpawnSyncReturns}   from "child_process";
import {Dirent} from "fs";
import {EOL}    from "os";
import * as C from "child_process";
import * as F from "fs";
import * as P from "path";




// TYPES
// =====

export {ChildProcess} from "child_process";
export {ChildProcessByStdio} from "child_process";
export {ChildProcessWithoutNullStreams} from "child_process";
export {CommonExecOptions}   from "child_process";
export {CommonOptions}       from "child_process";
export {CommonSpawnOptions}  from "child_process";
export {ExecException}       from "child_process";
export {ExecFileException}   from "child_process";
export {ExecFileOptions}     from "child_process";
export {ExecFileOptionsWithBufferEncoding} from "child_process";
export {ExecFileOptionsWithOtherEncoding}  from "child_process";
export {ExecFileOptionsWithStringEncoding} from "child_process";
export {ExecFileSyncOptions} from "child_process";
export {ExecFileSyncOptionsWithBufferEncoding} from "child_process";
export {ExecFileSyncOptionsWithStringEncoding} from "child_process";
export {ExecOptions} from "child_process";
export {ExecOptionsWithBufferEncoding} from "child_process";
export {ExecOptionsWithStringEncoding} from "child_process";
export {ForkOptions} from "child_process";
export {IOType}      from "child_process";
export {MessageOptions}    from "child_process";
export {MessagingOptions}  from "child_process";
export {ProcessEnvOptions} from "child_process";
export {PromiseWithChild}  from "child_process";
export {SendHandle}        from "child_process";
export {Serializable}      from "child_process";
export {SerializationType} from "child_process";
export {SpawnOptions}      from "child_process";
export {SpawnOptionsWithStdioTuple} from "child_process";
export {SpawnOptionsWithoutStdio}   from "child_process";
export {SpawnSyncOptions}  from "child_process";
export {SpawnSyncOptionsWithBufferEncoding} from "child_process";
export {SpawnSyncOptionsWithStringEncoding} from "child_process";
export {SpawnSyncReturns}  from "child_process";
export {StdioNull}      from "child_process";
export {StdioOptions}   from "child_process";
export {StdioPipe}      from "child_process";
export {StdioPipeNamed} from "child_process";




// METHODS
// =======

// export {exec} from "child_process";
// export {execFile} from "child_process";
export {fork}  from "child_process";
export {spawn} from "child_process";
export {execSync}     from "child_process";
export {execFileSync} from "child_process";
export {spawnSync}    from "child_process";




// EXEC
// ----

/** Return value from exec*Async(). */
export interface ExecAsyncReturns {
  /** Standard output written by child process. */
  stdout: string | Buffer,
  /** Standard error written by child process. */
  stderr: string | Buffer,
}

/** Error from exec*Async(). */
export interface ExecAsyncException extends ExecException, ExecAsyncReturns {}


/**
 * Callback for exec*().
 * @param error exec error
 * @param stdout standard output after exec
 * @param stderr standard error after exec
 */
export type ExecCallback = (error: ExecException, stdout: string | Buffer, stderr: string | Buffer) => void;


/** Callback and promise for exec*Async(). */
class ExecAsyncHandler {
  /** Resolve function of promise.  */
  resolve: (output: ExecAsyncReturns) => void;
  /** Reject function of promise. */
  reject:  (error:  ExecAsyncException) => void;
  /** Callback for exec*(). */
  callback: ExecCallback;
  /** Promise that resolves on completion */
  promise:  Promise<ExecAsyncReturns>;

  /** Define callback and promise for exec*Async(). */
  constructor() {
    this.resolve = null;
    this.reject  = null;
    this.callback = (err, stdout, stderr) => {
      if (err != null) this.reject(Object.assign(err, {stdout, stderr}));
      else this.resolve({stdout, stderr});
    };
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject  = reject;
    });
  }
}


/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function execAsync(command: string, options?: ExecSyncOptions): PromiseWithChild<ExecAsyncReturns> {
  var e = new ExecAsyncHandler();
  var child = C.exec(command, options, e.callback);
  return Object.assign(e.promise, {child});
}


/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function exec(command: string, callback: ExecCallback): ChildProcess;

/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param options options {cwd, env, ...}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function exec(command: string, options: ExecSyncOptions, callback: ExecCallback): ChildProcess;

/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function exec(command: string, options?: ExecSyncOptions): PromiseWithChild<ExecAsyncReturns>;

export function exec(command: string, options?: ExecSyncOptions | ExecCallback, callback?: ExecCallback): ChildProcess | PromiseWithChild<ExecAsyncReturns> {
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
  var e = new ExecAsyncHandler();
  var _args    = args instanceof Array? args    : null;
  var _options = args instanceof Array? options : args;
  var child = C.execFile(file, _args, _options, e.callback);
  return Object.assign(e.promise, {child});
}


/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function execFile(file: string, callback: ExecCallback): ChildProcess;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param options options {cwd, env, ...}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function execFile(file: string, options: ExecFileSyncOptions, callback: ExecCallback): ChildProcess;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function execFile(file: string, args: string[], callback: ExecCallback): ChildProcess;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param options options {cwd, env, ...}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function execFile(file: string, args: string[], options: ExecFileSyncOptions, callback: ExecCallback): ChildProcess;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function execFile(file: string, options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param options options {cwd, env, ...}
 * @returns output {stdout, stderr}
 */
export function execFile(file: string, args: string[], options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

export function execFile(file: string, args: string[] | ExecFileSyncOptions | ExecCallback, options?: ExecFileSyncOptions | ExecCallback, callback?: ExecCallback): ChildProcess | PromiseWithChild<ExecAsyncReturns> {
  if (typeof callback==="function") return C.execFile(file, args as string[], options as ExecFileSyncOptions, callback);
  if (typeof options ==="function") return C.execFile(file, args as any, options);
  if (typeof args==="function")     return C.execFile(file, args);
  return execFileAsync(file, args as any, options);
}




// SPAWN
// -----

/** Default maximum buffer size. */
const MAX_BUFFER = 1024 * 1024;


/** Encoding for stream. */
type StreamEncoding = BufferEncoding | "buffer";


/** Capturer of stream data. */
class StreamBuffer {
  /** Size of captured data. */
  size: number;
  /** Captured data. */
  data: string[] | Buffer[];
  /** Encoding of buffer. */
  encoding: BufferEncoding | "buffer";

  /**
   * Capture stream data.
   * @param stream readable stream
   * @param maxBuffer maximum buffer size [MAX_BUFFER]
   */
  constructor(stream: NodeJS.ReadableStream, encoding: StreamEncoding="buffer", maxBuffer: number=MAX_BUFFER) {
    this.size = 0;
    this.data = [];
    this.encoding = encoding;
    if (encoding && encoding!=="buffer") stream.setEncoding(encoding);
    stream.on("data", chunk => {
      if (this.size + chunk.length > maxBuffer) return;
      this.data.push(chunk);
      this.size += chunk.length;
    });
  }

  /** Get captured data of stream. */
  value(): string | Buffer {
    if (!this.encoding || this.encoding==="buffer") return Buffer.concat(this.data as Buffer[]);
    return this.data.join("");
  }
}


/**
 * Spawn new process using given command and arguments.
 * @param command command to run
 * @param options options {cwd, env, ...}
 * @returns output {pid, output, stdout, stderr, status, signal}
 */
export function spawnAsync(command: string, options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>>;

/**
 * Spawn new process using given command and arguments.
 * @param command command to run
 * @param args list of arguments
 * @param options options {cwd, env, ...}
 * @returns output {pid, output, stdout, stderr, status, signal}
 */
export function spawnAsync(command: string, args: string[], options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>>;

export function spawnAsync(command: string, args?: string[] | SpawnSyncOptions, options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>> {
  var _args     = args instanceof Array? args    : null;
  var _options  = args instanceof Array? options : args;
  var encoding  = _options?.encoding  || "buffer";
  var maxBuffer = _options?.maxBuffer || MAX_BUFFER;
  var child  = C.spawn(command, _args, _options);
  var outbuf = new StreamBuffer(child.stdout, encoding, maxBuffer);
  var errbuf = new StreamBuffer(child.stderr, encoding, maxBuffer);
  var promise: Promise<SpawnSyncReturns<string | Buffer>> = new Promise((resolve, reject) => {
    child.on("error", err => {
      var {pid, exitCode, signalCode} = child;
      var stdout = outbuf.value();
      var stderr = errbuf.value();
      var output = [null, stdout, stderr];
      reject(Object.assign(err, {pid, output, stdout, stderr, status: exitCode, signal: signalCode}));
    });
    child.on("close", (code, signal) => {
      var {pid} = child;
      var stdout = outbuf.value();
      var stderr = errbuf.value();
      var output = [null, stdout, stderr];
      resolve({pid, output, stdout, stderr, status: code, signal});
    });
  });
  return Object.assign(promise, {child});
}




// WHICH
// -----

export interface WhichOptions {
  /** Current working directory (win32 only). */
  cwd?: string,
  /** Paths to search for. */
  paths?: string[],
}


/**
 * Check whether a path satisfies a test.
 * @param path path of file or directory
 * @returns whether test is satisfied
 */
export type PathTestFunction = (path: string) => boolean;

/**
 * Callback for which*().
 * @param error which error
 * @param path executable path
 */
export type WhichCallback = (error: NodeJS.ErrnoException, path?: string) => void;

/**
 * Callback for whichAll*().
 * @param error which error
 * @param paths executable paths
 */
export type WhichAllCallback = (error: NodeJS.ErrnoException, paths?: string[]) => void;


function whichWin32(dir: string, entries: Dirent[], ft: PathTestFunction): string {
  var bin = null, binp = 0;
  var PATHEXT = process.env.PATHEXT.toUpperCase();
  for (var e of entries) {
    if (!e.isFile()) continue;
    var ext  = P.extname(e.name);
    var file = P.basename(e.name, ext);
    if (!ft(P.join(dir, file))) continue;
    var prio = PATHEXT.indexOf(ext.toUpperCase());
    if (prio <= binp) continue;
    bin  = P.join(dir, e.name);
    binp = prio;
  }
  return bin;
}

function whichAllWin32(dir: string, entries: Dirent[], ft: PathTestFunction): string[] {
  var bin = [];
  var PATHEXT = process.env.PATHEXT.toUpperCase();
  for (var e of entries) {
    if (!e.isFile()) continue;
    var ext  = P.extname(e.name);
    var file = P.basename(e.name, ext);
    if (!ft(P.join(dir, file))) continue;
    var prio = PATHEXT.indexOf(ext.toUpperCase());
    bin.push([P.join(dir, e.name), prio]);
  }
  bin.sort((a, b) => a[1] - b[1]);
  return bin.map(x => x[0]);
}


function whichLinuxSync(dir: string, entries: Dirent[], ft: PathTestFunction): string {
  for (var e of entries) {
    var full = P.join(dir, e.name);
    if (!ft(full)) continue;
    try { F.accessSync(full, F.constants.X_OK); }
    catch { continue; }
    return full;
  }
  return null;
}

function whichAllLinuxSync(dir: string, entries: Dirent[], ft: PathTestFunction): string[] {
  var a = [];
  for (var e of entries) {
    if (!e.isFile()) continue;
    var full = P.join(dir, e.name);
    if (!ft(full)) continue;
    try { F.accessSync(full, F.constants.X_OK); a.push(full); }
    catch {}
  }
  return a;
}


function whichLinuxAsync(dir: string, entries: Dirent[], ft: PathTestFunction): Promise<string> {
  return new Promise(resolve => {
    var n = 0;
    for (var e of entries) {
      if (!e.isFile()) continue;
      let full = P.join(dir, e.name);
      if (!ft(full)) continue;
      F.access(full, F.constants.X_OK, err => {
        if (err==null) resolve(full);
        if (--n===0) resolve(null);
      });
      ++n;
    }
  });
}

function whichAllLinuxAsync(dir: string, entries: Dirent[], ft: PathTestFunction): Promise<string[]> {
  return new Promise(resolve => {
    var a = [], n = 0;
    for (var e of entries) {
      if (!e.isFile()) continue;
      let full = P.join(dir, e.name);
      if (!ft(full)) continue;
      F.access(full, F.constants.X_OK, err => {
        if (err==null) a.push(full);
        if (--n===0) resolve(a);
      });
      ++n;
    }
  });
}


function whichFnSync(dirs: string[], ft: PathTestFunction): string {
  for (var dir of dirs) {
    var entries = F.readdirSync(dir, {withFileTypes: true});
    var bin = EOL==="\n"? whichLinuxSync(dir, entries, ft) : whichWin32(dir, entries, ft);
    if (bin!=null) return bin;
  }
  return null;
}

function whichAllFnSync(dirs: string[], ft: PathTestFunction): string[] {
  var a = [];
  for (var dir of dirs) {
    var entries = F.readdirSync(dir, {withFileTypes: true});
    var bins = EOL==="\n"? whichAllLinuxSync(dir, entries, ft) : whichAllWin32(dir, entries, ft);
    a.push(...bins);
  }
  return a;
}


async function whichFnAsync(dirs: string[], ft: PathTestFunction): Promise<string> {
  var binps = [];
  for (var dir of dirs) {
    var p = F.promises.readdir(dir, {withFileTypes: true});
    binps.push(p.then(entries => EOL==="\n"? whichLinuxAsync(dir, entries, ft) : whichWin32(dir, entries, ft)));
  }
  for (var binp of binps) {
    var bin = await binp;
    if (bin!=null) return bin;
  }
  return null;
}

async function whichAllFnAsync(dirs: string[], ft: PathTestFunction): Promise<string[]> {
  var binps = [], a = [];
  for (var dir of dirs) {
    var p = F.promises.readdir(dir, {withFileTypes: true});
    binps.push(p.then(entries => EOL==="\n"? whichAllLinuxAsync(dir, entries, ft) : whichAllWin32(dir, entries, ft)));
  }
  for (var binp of binps)
    a.push(...(await binp));
  return a;
}


function whichDirs(options?: WhichOptions) {
  var sep  = EOL==="\n"? ":" : ";";
  var dirs = options?.paths || process.env.PATH.split(sep);
  return EOL!=="\n" && options?.cwd? [options.cwd, ...dirs] : dirs;
}

function whichTestFunction(cmd: string | RegExp | PathTestFunction): PathTestFunction {
  if (typeof cmd==="function") return cmd;
  if (typeof cmd==="string") return path => P.basename(path)===cmd;
  return path => cmd.test(path);
}


/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @returns path of executable
 */
export function whichSync(cmd: string | RegExp | PathTestFunction, options?: WhichOptions): string {
  return whichFnSync(whichDirs(options), whichTestFunction(cmd));
}

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @returns paths of executables
 */
export function whichAllSync(cmd: string | RegExp | PathTestFunction, options?: WhichOptions): string[] {
  return whichAllFnSync(whichDirs(options), whichTestFunction(cmd));
}

/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @returns path of executable
 */
export function whichAsync(cmd: string | RegExp | PathTestFunction, options?: WhichOptions): Promise<string> {
  return whichFnAsync(whichDirs(options), whichTestFunction(cmd));
}

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @returns paths of executables
 */
export function whichAllAsync(cmd: string | RegExp | PathTestFunction, options?: WhichOptions): Promise<string[]> {
  return whichAllFnAsync(whichDirs(options), whichTestFunction(cmd));
}


/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param callback callback function (err, path)
 */
export function which(cmd: string | RegExp | PathTestFunction, callback: WhichCallback): void;

/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @param callback callback function (err, path)
 */
export function which(cmd: string | RegExp | PathTestFunction, options: WhichOptions, callback: WhichCallback): void;

/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @returns path of executable
 */
export function which(cmd: string | RegExp | PathTestFunction, options?: WhichOptions): Promise<string>;

export function which(cmd: string | RegExp | PathTestFunction, options?: WhichOptions | WhichCallback, callback?: WhichCallback): void | Promise<string> {
  if (typeof callback==="function") whichAsync(cmd, options as WhichOptions).then(bin => callback(null, bin), callback);
  else if (typeof options==="function") whichAsync(cmd).then(bin => options(null, bin), options);
  else return whichAsync(cmd, options);
}


/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param callback callback function (err, path)
 */
export function whichAll(cmd: string | RegExp | PathTestFunction, callback: WhichAllCallback): void;

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @param callback callback function (err, path)
 */
export function whichAll(cmd: string | RegExp | PathTestFunction, options: WhichOptions, callback: WhichAllCallback): void;

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options {cwd, paths}
 * @returns paths of executables
 */
export function whichAll(cmd: string | RegExp | PathTestFunction, options?: WhichOptions): Promise<string[]>;

export function whichAll(cmd: string | RegExp | PathTestFunction, options?: WhichOptions | WhichAllCallback, callback?: WhichAllCallback): void | Promise<string[]> {
  if (typeof callback==="function") whichAllAsync(cmd, options as WhichOptions).then(bin => callback(null, bin), callback);
  else if (typeof options==="function") whichAllAsync(cmd).then(bin => options(null, bin), options);
  else return whichAllAsync(cmd, options);
}
