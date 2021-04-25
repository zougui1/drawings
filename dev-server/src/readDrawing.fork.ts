const tryExec = <T>(callback: () => T): T | Error => {
  try {
    return callback();
  } catch (error) {
    return error;
  }
}

process.on('message', (dir) => {
  const { drawing } = require(dir);

  if (typeof drawing !== 'function') {
    // @ts-ignore
    process.send(`"${dir}" must return a 'drawing' function. Got "${drawing}"`);
  } else {
    const drawer = tryExec<any>(drawing);

    if (drawer instanceof Error) {
      // @ts-ignore
      process.send({
        type: 'error',
        message: drawer.message,
        stack: drawer.stack,
      });
    } else if (!drawer || typeof drawer !== 'object') {
      // @ts-ignore
      process.send(`"drawing" must return an object. Got "${drawer}"`);
    } else if (typeof drawer.toObject !== 'function') {
      // @ts-ignore
      process.send(`The return of "drawing" must have a method "toObject". Got "${drawer.toObject}"`);
    } else {
      const data = drawer.toObject();
      // @ts-ignore
      process.send(data);
    }
  }

  setTimeout(() => {
    process.exit(0);
  }, 15000);
});

export default null;
