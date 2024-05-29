export default interface User {
  keywords?: string[];
  info?: string;
  summary?: string;
  about?: string;
  profilePic?: {
    url: string;
    width: number;
    height: number;
  };
  name?: string;
  email?: string;
  token?: string;
  role?: string;
  id?: string;
}
