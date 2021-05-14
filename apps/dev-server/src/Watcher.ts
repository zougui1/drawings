import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

export class Watcher {

  watchers: fs.FSWatcher[] = [];
  path: string;
  listener: (event: string, data: WatchData) => any
  options: WatcherOptions;

  constructor(path: string, options: WatcherOptions, listener: (event: string, data: WatchData) => any) {
    this.path = path;
    this.options = options;
    this.listener = _.debounce(listener, 100);
  }

  private watchDir(pathName: string) {
    const stats = fs.lstatSync(pathName);

    if (!stats.isDirectory()) {
      return;
    }

    const files = fs.readdirSync(pathName);

    for (const file of files) {
      this.watchDir(path.join(pathName, file));
    }

    this.watchers.push(fs.watch(pathName, this.actualListener(pathName)));
  }

  private actualListener(dir: string) {
    return (event: string, fileName: string) => {
      console.log(event)
      if (this.options.ignorePattern && this.options.ignorePattern.test(fileName)) {
        return;
      }

      const data: WatchData = {
        fileName,
        dir,
        absolutePath: path.join(dir, fileName),
      };

      this.listener(event, data);
    }
  }

  watch() {
    this.watchDir(this.path);
  }

  restart() {
    for (const watcher of this.watchers) {
      watcher.close();
    }

    this.watchers = [];
    this.watch();
  }
}

export interface WatchData {
  dir: string;
  fileName: string;
  absolutePath: string;
}

export interface WatcherOptions {
  ignorePattern?: RegExp;
}
