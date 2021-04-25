import childProcess from 'child_process';

type ForkArgs =
| [modulePath: string, options?: childProcess.ForkOptions | undefined]
| [modulePath: string, args?: readonly string[] | undefined, options?: childProcess.ForkOptions | undefined];

export const createFork = (...args: ForkArgs) => {
  // @ts-ignore
  const sub = childProcess.fork(...args);

  return <T>(data?: any) => new Promise<T>((resolve, reject) => {
    sub.on('message', (outsideData: any) => {
      resolve(outsideData);
      sub.disconnect();
    });
    sub.on('error', reject);
    sub.send(data);
  });
}
