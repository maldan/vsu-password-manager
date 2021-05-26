import * as Fs from 'fs';
import { UID } from '../util/UID';

const jsonParseDate = (key: string, value: unknown) => {
  if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{0,3}Z/)) {
    return new Date(value);
  }
  return value;
};

export class DocumentDB<T> {
  private _path!: string;
  private _linkList: {
    id: string;
    recordName: string;
    duration: number;
    created: Date;
  }[] = [];
  private _cache: Record<string, T> = {};
  private _queue: { recordName: string; created: Date; time: number }[] = [];
  private _useCache: boolean = false;

  constructor(path: string, useCache: boolean = true) {
    this._path = path;
    this._useCache = useCache;
    Fs.mkdirSync(path, { recursive: true });

    try {
      this._linkList = JSON.parse(Fs.readFileSync(`${path}.link.json`, 'utf-8'), jsonParseDate);
    } catch {
      this._linkList = [];
    }

    setInterval(() => {
      for (let i = 0; i < this._queue.length; i++) {
        if (new Date().getTime() - this._queue[i].created.getTime() > this._queue[i].time) {
          console.log(`Saved record ${this._queue[i].recordName}`);
          this.save(this._queue[i].recordName, this._cache[this._queue[i].recordName]);
          this._queue.splice(i, 1);
        }
      }
    }, 1000);
  }

  get(recordName: string): T | null {
    if (this._useCache && this._cache[recordName]) {
      return this._cache[recordName];
    }

    try {
      this._cache[recordName] = JSON.parse(
        Fs.readFileSync(`${this._path}/${recordName}.json`, 'utf-8'),
        jsonParseDate,
      );
      return this._cache[recordName];
    } catch (e) {
      return null;
    }
  }

  getOrFail(recordName: string): T {
    const record = this.get(recordName);
    if (!record) {
      throw new Error(`Record "${recordName}" not found!`);
    }
    return record;
  }

  getByLink(linkToken: string): T | null {
    try {
      const record = this._linkList.find((x) => x.id === linkToken);
      if (record) {
        if (this._useCache && this._cache[record.recordName]) {
          return this._cache[record.recordName];
        }

        this._cache[record.recordName] = JSON.parse(
          Fs.readFileSync(`${this._path}/${record.recordName}.json`, 'utf-8'),
          jsonParseDate,
        );
        return this._cache[record.recordName];
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  getByLinkOrFail(linkToken: string): T {
    const record = this.getByLink(linkToken);
    if (!record) {
      throw new Error(`Record by token "${linkToken}" not found!`);
    }
    return record;
  }

  create(recordName: string, data: Partial<T>): void {
    if (!Fs.existsSync(`${this._path}/${recordName}.json`)) {
      Fs.writeFileSync(`${this._path}/${recordName}.json`, JSON.stringify(data));
    }
  }

  save(recordName: string, data: T): void {
    this._cache[recordName] = data;

    Fs.writeFileSync(`${this._path}/${recordName}.json`, JSON.stringify(data));
  }

  saveLater(recordName: string, data: T): void {
    this._cache[recordName] = data;
    // Remove previous saves for record
    this._queue = this._queue.filter((x) => x.recordName !== recordName);

    // Push to queue
    this._queue.push({
      recordName,
      time: 5000,
      created: new Date(),
    });
  }

  createLink(recordName: string, duration: number = 60 * 60 * 7): string {
    const id = UID();

    this._linkList.push({
      id,
      recordName,
      duration,
      created: new Date(),
    });

    Fs.writeFileSync(`${this._path}.link.json`, JSON.stringify(this._linkList));

    return id;
  }
}
