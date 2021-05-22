import { WebServer, WS_Router } from '@maldan/tslib-rest-server';
// @ts-ignore
import * as WebView from 'webview';
import Portfinder from 'portfinder';

import Yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

(async () => {
  const argv = Yargs(hideBin(process.argv)).argv;
  let port = 0;
  console.log(argv);
  if (argv.debug === 'true') {
    port = 16000;
  } else {
    port = await Portfinder.getPortPromise({
      port: 40000, // minimum port
      stopPort: 50000, // maximum port sasage
    });
  }

  const buildPath = process.cwd().replace(/\\/g, '/') + '/build';
  const web = new WebServer([new WS_Router('', [], [buildPath])]);
  web.listen(port);

  /*const child = WebView.spawn({
    // options for webview
    title: 'My App',
    width: 1280,
    height: 720,
    url: `http://localhost:${port}/index.html`,

    // options for child_process.spawn
    cwd: process.cwd(),
  });
  child.on('exit', () => {
    process.exit(0);
  });*/
})();
