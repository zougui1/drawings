import fs from 'fs-extra';
import path from 'path';

export class Watcher {

  watchers: fs.FSWatcher[] = [];
  path: string;
  listener: (event: string, data: WatchData) => any

  constructor(path: string, listener: (event: string, data: WatchData) => any) {
    this.path = path;
    this.listener = listener;
  }

  private watchDir(fileName: string) {
    const stats = fs.lstatSync(fileName);

    if (!stats.isDirectory()) {
      return;
    }

    const files = fs.readdirSync(fileName);

    for (const file of files) {
      this.watchDir(path.join(fileName, file));
    }

    this.watchers.push(fs.watch(fileName, this.actualListener(fileName)));
  }

  private actualListener(dir: string) {
    return (event: string, fileName: string) => {
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
