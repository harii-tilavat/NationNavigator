
export class GameModel {
  id!: string;
  title!: string;
  description!: string;
  instructions?: string;
  url!: string;
  thumb!: string;
  thumbBig?: string;
  categoryId!: string;
  sortOrder!: number;
}

export class GameMenuModel {
  id!: string;
  title!: string;
  gameList!: Array<GameModel>;
  index!: number;
}

export class GameModelHot {
  id!: string;
  title!: string;
  description!: string;
  instructions!: string;
  url!: string;
  category!: string;
  tags!: string;
  thumb!: string;
  width!: string;
  height!: string;
  categoryId!: string;
  thumbBig?: string;
}
export class CategoryListModel {
  id!: string;
  title!: string;
  gameList!: Array<GameModelHot>;
  category!: string;
}
