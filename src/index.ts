import {Dirent} from "fs";
import {EOL}    from "os";
import {
  ExecException,
  ChildProcess,
  PromiseWithChild,
  ExecSyncOptions,
  ExecFileSyncOptions,
  SpawnSyncOptions,
  SpawnSyncReturns,
} from "child_process";
import * as C from "child_process";
import * as F from "fs";
import * as P from "path";




// TYPES
// =====

export {
  ChildProcess,
  ChildProcessByStdio,
  ChildProcessWithoutNullStreams,
  CommonExecOptions,
  CommonOptions,
  CommonSpawnOptions,
  ExecException,
  ExecFileException,
  ExecFileOptions,
  ExecFileOptionsWithBufferEncoding,
  ExecFileOptionsWithOtherEncoding,
  ExecFileOptionsWithStringEncoding,
  ExecFileSyncOptions,
  ExecFileSyncOptionsWithBufferEncoding,
  ExecFileSyncOptionsWithStringEncoding,
  ExecOptions,
  ExecOptionsWithBufferEncoding,
  ExecOptionsWithStringEncoding,
  ForkOptions,
  IOType,
  MessageOptions,
  MessagingOptions,
  ProcessEnvOptions,
  PromiseWithChild,
  SendHandle,
  Serializable,
  SerializationType,
  SpawnOptions,
  SpawnOptionsWithStdioTuple,
  SpawnOptionsWithoutStdio,
  SpawnSyncOptions,
  SpawnSyncOptionsWithBufferEncoding,
  SpawnSyncOptionsWithStringEncoding,
  SpawnSyncReturns,
  StdioNull,
  StdioOptions,
  StdioPipe,
  StdioPipeNamed,
} from "child_process";




// METHODS
// =======

export {
  // exec,
  // execFile,
  fork,
  spawn,
  execSync,
  execFileSync,
  spawnSync,
} from "child_process";




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
 * @param options options \{cwd, env, ...\}
 * @returns output \{stdout, stderr\}
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
 * @param options options \{cwd, env, ...\}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function exec(command: string, options: ExecSyncOptions, callback: ExecCallback): ChildProcess;

/**
 * Execute a command within a shell, buffering any output.
 * @param command command to run, with space-separated arguments
 * @param options options \{cwd, env, ...\}
 * @returns output \{stdout, stderr\}
 */
export function exec(command: string, options?: ExecSyncOptions): PromiseWithChild<ExecAsyncReturns>;

export function exec(...args: any[]): ChildProcess | PromiseWithChild<ExecAsyncReturns> {
  if (typeof args[args.length-1]==="function") C.exec.apply(null, args);
  else return execAsync.apply(null, args);
}




// EXEC-FILE
// ---------

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param options options \{cwd, env, ...\}
 * @returns output \{stdout, stderr\}
 */
export function execFileAsync(file: string, options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param options options \{cwd, env, ...\}
 * @returns output \{stdout, stderr\}
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
 * @param options options \{cwd, env, ...\}
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
 * @param options options \{cwd, env, ...\}
 * @param callback callback function (err, stdout, stderr)
 * @returns child process
 */
export function execFile(file: string, args: string[], options: ExecFileSyncOptions, callback: ExecCallback): ChildProcess;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param options options \{cwd, env, ...\}
 * @returns output \{stdout, stderr\}
 */
export function execFile(file: string, options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

/**
 * Execute an executable without a shell by default, buffering any output.
 * @param file name or path of executable file
 * @param args list of arguments
 * @param options options \{cwd, env, ...\}
 * @returns output \{stdout, stderr\}
 */
export function execFile(file: string, args: string[], options?: ExecFileSyncOptions): PromiseWithChild<ExecAsyncReturns>;

export function execFile(...args: any[]): ChildProcess | PromiseWithChild<ExecAsyncReturns> {
  if (typeof args[args.length-1]==="function") C.execFile.apply(null, args);
  else return execFileAsync.apply(null, args);
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
 * @param options options \{cwd, env, ...\}
 * @returns output \{pid, output, stdout, stderr, status, signal\}
 */
export function spawnAsync(command: string, options?: SpawnSyncOptions): PromiseWithChild<SpawnSyncReturns<string | Buffer>>;

/**
 * Spawn new process using given command and arguments.
 * @param command command to run
 * @param args list of arguments
 * @param options options \{cwd, env, ...\}
 * @returns output \{pid, output, stdout, stderr, status, signal\}
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
  /** Extension names to match (win32 only). */
  extnames?: string[],
}


/**
 * Check whether a file satisfies a test.
 * @param file name of file
 * @returns whether test is satisfied
 */
export type FileTestFunction = (file: string) => boolean;

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


// Get first matching executable with highest priority (needs entries ordered by name).
function whichWin32(dir: string, entries: Dirent[], exts: string[], ft: FileTestFunction): string {
  var apath = null, afile = null;
  var aprio = Number.MAX_SAFE_INTEGER;
  for (var e of entries) {
    if (!e.isFile()) continue;
    var ext  = P.extname(e.name);
    var file = P.basename(e.name, ext);
    if (afile!=null && file!==afile) break;
    if (!ft(file)) continue;
    var prio = exts.indexOf((ext||".?").toLowerCase());
    if (prio<0 || prio>=aprio) continue;
    apath = P.join(dir, e.name);
    afile = file;
    aprio = prio;
  }
  return apath;
}

// Get matching executables ordered by name and priority.
function whichAllWin32(dir: string, entries: Dirent[], exts: string[], ft: FileTestFunction): string[] {
  var a = [];
  for (var e of entries) {
    if (!e.isFile()) continue;
    var ext  = P.extname(e.name);
    var file = P.basename(e.name, ext);
    if (!ft(file)) continue;
    var prio = exts.indexOf((ext||".?").toLowerCase());
    if (prio>=0) a.push({file, prio, path: P.join(dir, e.name)});
  }
  a.sort((a, b) => a.file.localeCompare(b.file) || a.prio - b.prio);
  return a.map(x => x.path);
}


// Get first matching executable (needs entries ordered by name).
function whichLinuxSync(dir: string, entries: Dirent[], ft: FileTestFunction): string {
  for (var e of entries) {
    if (!e.isFile()) continue;
    if (!ft(e.name)) continue;
    var path = P.join(dir, e.name);
    try { F.accessSync(path, F.constants.X_OK); }
    catch { continue; }
    return path;
  }
  return null;
}

// Get matching executables ordered by name.
function whichAllLinuxSync(dir: string, entries: Dirent[], ft: FileTestFunction): string[] {
  var a = [];
  for (var e of entries) {
    if (!e.isFile()) continue;
    if (!ft(e.name)) continue;
    var path = P.join(dir, e.name);
    try { F.accessSync(path, F.constants.X_OK); a.push(path); }
    catch {}
  }
  return a.sort();
}

// Get first matching executable (needs entries ordered by name).
function whichLinuxAsync(dir: string, entries: Dirent[], ft: FileTestFunction): Promise<string> {
  return new Promise(resolve => {
    var n = 0, paths = [];
    var best = Number.MAX_SAFE_INTEGER;
    for (var e of entries) {
      if (!e.isFile()) continue;
      if (!ft(e.name)) continue;
      let i    = paths.push(null) - 1;
      let path = P.join(dir, e.name);
      F.access(path, F.constants.X_OK, err => {
        paths[i] = err? "" : path; --n;
        if (!err) best = Math.min(best, i);
        if (best===Number.MAX_SAFE_INTEGER) { if (n===0) resolve(null); }
        else if (!paths.slice(0, best).includes(null)) resolve(paths[best]);
      });
      ++n;
    }
  });
}

// Get matching executables.
function whichAllLinuxAsync(dir: string, entries: Dirent[], ft: FileTestFunction): Promise<string[]> {
  return new Promise(resolve => {
    var a = [], n = 0;
    for (var e of entries) {
      if (!e.isFile()) continue;
      if (!ft(e.name)) continue;
      let path = P.join(dir, e.name);
      F.access(path, F.constants.X_OK, err => {
        if (!err) a.push(path);
        if (--n===0) resolve(a.sort());
      });
      ++n;
    }
  });
}

// Get first matching executable (needs entries ordered by name).
function whichFnSync(dirs: Set<string>, exts: string[], ft: FileTestFunction): string {
  for (var dir of dirs) {
    var entries = F.readdirSync(dir, {withFileTypes: true}).sort((a, b) => a.name.localeCompare(b.name));
    var path = EOL==="\n"? whichLinuxSync(dir, entries, ft) : whichWin32(dir, entries, exts, ft);
    if (path) return path;
  }
  return null;
}

// Get matching executables.
function whichAllFnSync(dirs: Set<string>, exts: string[], ft: FileTestFunction): string[] {
  var a = [];
  for (var dir of dirs) {
    var entries = F.readdirSync(dir, {withFileTypes: true});
    var paths = EOL==="\n"? whichAllLinuxSync(dir, entries, ft) : whichAllWin32(dir, entries, exts, ft);
    a.push(...paths);
  }
  return a;
}


// Get first matching executable (needs entries ordered by name).
async function whichFnAsync(dirs: Set<string>, exts: string[], ft: FileTestFunction): Promise<string> {
  var pathps = [];
  for (let dir of dirs) {
    var p = F.promises.readdir(dir, {withFileTypes: true}).then(entries => entries.sort((a, b) => a.name.localeCompare(b.name)));
    pathps.push(p.then(entries => EOL==="\n"? whichLinuxAsync(dir, entries, ft) : whichWin32(dir, entries, exts, ft)));
  }
  for (var pathp of pathps) {
    var path = await pathp;
    if (path) return path;
  }
  return null;
}

// Get matching executables.
async function whichAllFnAsync(dirs: Set<string>, exts: string[], ft: FileTestFunction): Promise<string[]> {
  var pathps = [], a = [];
  for (let dir of dirs) {
    var p = F.promises.readdir(dir, {withFileTypes: true});
    pathps.push(p.then(entries => EOL==="\n"? whichAllLinuxAsync(dir, entries, ft) : whichAllWin32(dir, entries, exts, ft)));
  }
  for (var pathp of pathps)
    a.push(...(await pathp));
  return a;
}


function whichDirs(options?: WhichOptions): Set<string> {
  var sep  = EOL==="\n"? ":" : ";";
  var dirs = options?.paths || process.env.PATH.split(sep);
  return EOL!=="\n" && options?.cwd? new Set([options.cwd, ...dirs]) : new Set(dirs);
}

function whichExts(options?: WhichOptions): string[] {
  return options?.extnames || (process.env.PATHEXT||"").toLowerCase().split(";");
}

function whichTestFunction(cmd: string | RegExp | FileTestFunction): FileTestFunction {
  if (typeof cmd==="function") return cmd;
  if (typeof cmd==="string") return file => file===cmd;
  return file => cmd.test(file);
}


/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @returns path of executable
 */
export function whichSync(cmd: string | RegExp | FileTestFunction, options?: WhichOptions): string {
  return whichFnSync(whichDirs(options), whichExts(options), whichTestFunction(cmd));
}

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @returns paths of executables
 */
export function whichAllSync(cmd: string | RegExp | FileTestFunction, options?: WhichOptions): string[] {
  return whichAllFnSync(whichDirs(options), whichExts(options), whichTestFunction(cmd));
}

/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @returns path of executable
 */
export function whichAsync(cmd: string | RegExp | FileTestFunction, options?: WhichOptions): Promise<string> {
  return whichFnAsync(whichDirs(options), whichExts(options), whichTestFunction(cmd));
}

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @returns paths of executables
 */
export function whichAllAsync(cmd: string | RegExp | FileTestFunction, options?: WhichOptions): Promise<string[]> {
  return whichAllFnAsync(whichDirs(options), whichExts(options), whichTestFunction(cmd));
}


/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param callback callback function (err, path)
 */
export function which(cmd: string | RegExp | FileTestFunction, callback: WhichCallback): void;

/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @param callback callback function (err, path)
 */
export function which(cmd: string | RegExp | FileTestFunction, options: WhichOptions, callback: WhichCallback): void;

/**
 * Locate path of executable for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @returns path of executable
 */
export function which(cmd: string | RegExp | FileTestFunction, options?: WhichOptions): Promise<string>;

export function which(cmd: string | RegExp | FileTestFunction, options?: WhichOptions | WhichCallback, callback?: WhichCallback): void | Promise<string> {
  if (typeof callback==="function") whichAsync(cmd, options as WhichOptions).then(bin => callback(null, bin), callback);
  else if (typeof options==="function") whichAsync(cmd).then(bin => options(null, bin), options);
  else return whichAsync(cmd, options);
}


/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param callback callback function (err, path)
 */
export function whichAll(cmd: string | RegExp | FileTestFunction, callback: WhichAllCallback): void;

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @param callback callback function (err, path)
 */
export function whichAll(cmd: string | RegExp | FileTestFunction, options: WhichOptions, callback: WhichAllCallback): void;

/**
 * Locate paths of all matching executables for given command.
 * @param cmd command to locate
 * @param options which options \{cwd, paths\}
 * @returns paths of executables
 */
export function whichAll(cmd: string | RegExp | FileTestFunction, options?: WhichOptions): Promise<string[]>;

export function whichAll(cmd: string | RegExp | FileTestFunction, options?: WhichOptions | WhichAllCallback, callback?: WhichAllCallback): void | Promise<string[]> {
  if (typeof callback==="function") whichAllAsync(cmd, options as WhichOptions).then(bin => callback(null, bin), callback);
  else if (typeof options==="function") whichAllAsync(cmd).then(bin => options(null, bin), options);
  else return whichAllAsync(cmd, options);
}
