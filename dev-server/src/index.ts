import path from 'path';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import _ from 'lodash';
import chalk from 'chalk';

import { Watcher, WatchData } from './Watcher';
import { createFork } from './createFork';

if (!process.argv[2] && !process.env.WATCH_DIR_NAME) {
  console.error(chalk.red('Missing path argument.'));
  process.exit(1);
}

const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const httpServer = http.createServer(app);
const io = new Server(httpServer);
console.log(process.argv, process.env.WATCH_DIR_NAME)
const dir = path.join(__dirname, '../../drawings/lib/drawings', process.env.WATCH_DIR_NAME || process.argv[2] || '');

const sendDrawingToClient = async () => {
  const readDrawing = createFork(path.join(__dirname, './readDrawing.fork.js'));
  console.time('parse');
  const data = await readDrawing<any>(dir);
  console.timeEnd('parse');

  if (typeof data === 'string') {
    console.error(chalk.red(data));
  } else if (data && typeof data === 'object') {
    if (data.type === 'error') {
      //console.error(data);
      console.error(new Error(data.message));
    }

    console.time('stringify');
    io.emit('update-svg', JSON.stringify(data));
    console.timeEnd('stringify');
  } else {
    console.error(chalk.red(`Invalid data type, expected an object or a string. Got "${data}"`));
  }
}

const handleChange = async (event: string, data: WatchData) => {
  console.log('update:', event, data.fileName);

  if (event === 'rename') {
    watcher.restart();
    return;
  }

  await sendDrawingToClient();
}

const watcher = new Watcher(dir, _.throttle(handleChange, 100));
watcher.watch();

io.on('connection', socket => {
  console.log(chalk.green('connection'));

  sendDrawingToClient();

  socket.on('disconnect', () => {
    console.log(chalk.yellow('disconnect'));
  });
});

httpServer.listen(3545, () => {
  console.log('listening on 3545');
});
