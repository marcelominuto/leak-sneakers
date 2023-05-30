interface Embed {
  color: string | number;
  title: string;
  url?: string;
  author?: Author;
  description: string;
  thumbnail: Thumbnail;
  fields: Field[];
  image?: Thumbnail;
  timestamp: Date;
  footer: Footer;
}

interface Footer {
  text: string;
  icon_url?: string;
}

interface Field {
  name: string;
  value: string;
  inline?: boolean;
}

interface Thumbnail {
  url: string;
}

interface Author {
  name: string;
  icon_url: string;
  url: string;
}

