import { Config } from '@maldan/tslib-rest-server';
import { DB } from '../db/DB';
import { UID } from '../util/UID';

export class MainApi {
  static path: string = 'main';

  @Config({
    useJsonWrapper: true,
  })
  static get_list(): unknown {
    const db = DB.main.getOrFail('main');
    return db.items;
  }

  @Config({
    useJsonWrapper: true,
  })
  static post_item({
    type,
    service,
    description,
    content,
  }: {
    type: string;
    service: string;
    description: string;
    content: string[];
  }): void {
    const db = DB.main.getOrFail('main');
    db.items.push({
      id: UID(),
      type,
      service,
      description,
      content,
      created: new Date(),
    });
    DB.main.save('main', db);
  }

  @Config({
    useJsonWrapper: true,
  })
  static patch_item({
    id,
    service,
    description,
    content,
  }: {
    id: string;
    type: string;
    service: string;
    description: string;
    content: string[];
  }): void {
    const db = DB.main.getOrFail('main');
    const item = db.items.find((x) => x.id === id);
    if (item) {
      item.service = service;
      item.description = description;
      item.content = content;
      DB.main.save('main', db);
    }
  }

  @Config({
    useJsonWrapper: true,
  })
  static delete_item({ id }: { id: string }): void {
    const db = DB.main.getOrFail('main');
    db.items = db.items.filter((x) => x.id !== id);
    DB.main.save('main', db);
  }
}
