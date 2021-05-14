import path from 'path';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';
import chokidar from 'chokidar';

import * as socket from './socket';
import { readDrawing } from './readDrawing';
import { writeFrames } from './writeFrames';

if (!process.env.WATCH_DIR_NAME) {
  console.error(chalk.red('Missing path argument.'));
  process.exit(1);
}

console.log('watch:', process.env.WATCH_DIR_NAME)
const dir = path.join(__dirname, '../../../drawings/lib/drawings', process.env.WATCH_DIR_NAME || '');

(async () => {
  //const data = readDrawing(dir);
  //await writeFrames(data);
})();

const sendDrawingToClient = async () => {
  try {
    console.time('parse')
    const data = readDrawing(dir);
    console.timeEnd('parse')

    console.time('stringify');
    socket.emit('update-svg', JSON.stringify(data));
    console.timeEnd('stringify');
  } catch (error) {
    if (error.custom) {
      console.error(chalk.red(error.message), `\n${error.details ?? ''}`);
    } else {
      console.error(chalk.red(error.stack));
    }
  }
}

chokidar.watch(dir, {
  ignored: /(\.ts)|(\.map)$/,
  persistent: true,
})
  .on('change', async pathname => {
    const time = moment().format('LTS');
    console.group(chalk.blue(time), 'update:', chalk.white(path.basename(pathname)));
    await sendDrawingToClient();
    console.groupEnd();
  });

socket.on('connect', sendDrawingToClient);
