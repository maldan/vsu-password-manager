import { WebServer, WS_Router } from '@maldan/tslib-rest-server';
// @ts-ignore
import * as WebView from 'webview';
import Portfinder from 'portfinder';

import Yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { DB } from './db/DB';
import { MainApi } from './rest/MainApi';

(async () => {
  const argv = Yargs(hideBin(process.argv)).argv;

  // Find random port or get from args
  const port =
    Number(argv.port) ||
    (await Portfinder.getPortPromise({
      port: 40000,
      stopPort: 50000,
    }));

  // Init db
  DB.init();

  // Start web server
  const buildPath = process.cwd().replace(/\\/g, '/') + '/build';
  const web = new WebServer([new WS_Router('api', [MainApi]), new WS_Router('', [], [buildPath])]);
  web.listen(port);

  if (!argv.nogui) {
    const child = WebView.spawn({
      title: 'Password Manager',
      width: 1280,
      height: 720,
      url: `http://localhost:${port}/index.html`,
      cwd: process.cwd(),
    });
    child.on('exit', () => {
      process.exit(0);
    });
  }
})();
