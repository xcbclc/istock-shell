import { Application } from '@istock/iswork';
import { getPipeAlias } from './common/pipes';
import { RootDomain } from './domains/root.domain';
import { inintDataSource } from './datasource-register';

self.onerror = function (event) {
  console.error('Web Worker:', event);
};

const bootstrap = async () => {
  await inintDataSource();
  const app = new Application({
    emit: (message: unknown) => {
      if (self.window) {
        console.log(message);
      } else {
        self.postMessage(message);
      }
    },
  });
  const eventCallback = app.listen(RootDomain);
  const pipes = getPipeAlias();
  Object.keys(pipes).forEach((key) => {
    app.usePipe(key, pipes[key]);
  });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  self.addEventListener('message', eventCallback);
};

bootstrap().catch(console.error);
