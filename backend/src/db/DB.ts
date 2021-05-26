import { IDB } from '../Types';
import { DocumentDB } from './DocumentDB';
import * as Os from 'os';

export class DefaultStruct {}

export class DB {
  static main: DocumentDB<IDB>;

  static init(): void {
    this.main = new DocumentDB<IDB>(`${Os.homedir}/.gam-data/vsu-password-manager/db`);
    this.main.create('main', {
      masterPassword: '',
      items: [],
    });
  }
}
