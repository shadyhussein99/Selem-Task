export interface Data {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
}

export interface BlogData {
  [key: string]: Data[];
}
