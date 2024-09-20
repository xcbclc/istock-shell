import { Application } from '@istock/iswork';
import { getPipeAlias } from './common/pipes';
import { RootDomain } from './domains/root.domain';
import { initDataSource } from './datasource-register';

self.onerror = function (event) {
  console.error('Web Worker:', event);
};

const bootstrap = async () => {
  await initDataSource();
  const app = new Application({
    emit: (message: unknown, options?: { targetOrigin?: string; transfer?: Transferable[] }) => {
      if (self.window) {
        console.debug(message, options ?? {});
      } else {
        self.postMessage(message, options ?? {});
      }
    },
  });
  const messageCallback = app.listen(RootDomain);
  const pipes = getPipeAlias();
  Object.keys(pipes).forEach((key) => {
    app.usePipe(key, pipes[key]);
  });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  self.addEventListener('message', messageCallback);
};

bootstrap().catch(console.error);
