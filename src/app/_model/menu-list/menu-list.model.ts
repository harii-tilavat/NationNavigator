export class MenuListModel {
  id!: string;
  title!: string;
  icon!: string | null;
  routing?: Array<string> | string | null;
  enum?: string;
  category?: string;
}
