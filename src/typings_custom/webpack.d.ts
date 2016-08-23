// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare function require(path: string);

interface WebpackRequire {
  (id: string): any;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
  context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
  keys(): string[];
}

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// Extend typings
interface NodeRequire extends WebpackRequire {}
interface ErrorConstructor extends ErrorStackTraceLimit {}

