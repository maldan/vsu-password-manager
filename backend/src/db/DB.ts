import { IDB } from '../Types';
import { DocumentDB } from './DocumentDB';
import * as Os from 'os';
import * as Fse from 'fs-extra';

export class DefaultStruct {}

export class DB {
  static main: DocumentDB<IDB>;

  static init(): void {
    try {
      Fse.copyFileSync(
        `${Os.homedir}/.gam-data/vsu-password-manager/db/main.json`,
        `${Os.homedir}/.gam-data/vsu-password-manager/db/main-${new Date().getTime()}.json`,
      );
    } catch {}

    this.main = new DocumentDB<IDB>(`${Os.homedir}/.gam-data/vsu-password-manager/db`);
    this.main.create('main', {
      masterPassword: '',
      items: [],
    });
  }
}
