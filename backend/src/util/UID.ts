import SHA1 from 'sha1';
import * as OS from 'os';

export function UID(): string {
  const f1 = SHA1(
    Math.random() +
      '_' +
      Math.random() +
      '_' +
      Math.random() +
      '_sasageo_' +
      new Date() +
      OS.freemem(),
  );
  const f2 = SHA1(
    Math.random() +
      '_' +
      Math.random() +
      '_' +
      Math.random() +
      '_sasageo_' +
      new Date() +
      OS.freemem(),
  );
  return f1.slice(0, 6) + 'x' + f2.slice(-6);
}
