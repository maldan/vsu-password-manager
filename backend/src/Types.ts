export interface IDB {
  masterPassword: string;
  items: {
    id: string;
    created: Date;
    type: string;
    service: string;
    description: string;
    content: string[];
  }[];
}
