export default interface User {
  keywords?: string;
  info?: string;
  summary?: string;
  about?: string;
  profilePic?: {
    url: string;
    width: string;
    height: string;
  };
  name?: string;
  email?: string;
  token?: string;
  role?: string;
  id?: string;
}

