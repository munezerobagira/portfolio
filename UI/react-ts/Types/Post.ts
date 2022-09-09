export default interface Post {
  _id?: string;
  title?: string;
  content?: string;
  summary?: string;
  image?: {
    path: string;
  };
  categories?: [{ _id: string; title: string }];
  author?: {
    name?: string;
    _id?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

