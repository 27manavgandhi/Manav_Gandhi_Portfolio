export type Blog = {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
  tags?: string[];
  isExternal?: boolean;
  url?: string;
  // rest
  [key: string]: any;
};
