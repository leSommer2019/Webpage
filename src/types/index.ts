export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  topic: 'rl' | 'gaming' | 'coding';
  date: string;
  likes: number;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export type Theme = 'light' | 'dark';
export type Language = 'de' | 'en';
