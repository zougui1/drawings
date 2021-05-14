import chalk from 'chalk';
import { Server } from 'socket.io';

import { httpServer } from './server';

const connectListeners: (() => void)[] = [];
const io = new Server(httpServer);

io.on('connection', socket => {
  console.log(chalk.green('connection'));

  for (const listener of connectListeners) {
    listener();
  }

  socket.on('disconnect', () => {
    console.log(chalk.yellow('disconnect'));
  });
});

const on = (event: 'connect', listener: () => void): void => {
  switch (event) {
    case 'connect':
      connectListeners.push(listener);
      break;
  }
}

const emit = (event: string, ...args: any[]): void => {
  io.emit(event, ...args);
}

export { emit, on };
