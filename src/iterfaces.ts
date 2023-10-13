export interface Book {
  id: string;
  isFeatured: boolean;
  name: string;
  author: string;
  publicationDate: string;
  coverImageLink: string;
  details: string;
  genre: string;
  price: number;
}

export interface CartItem {
  bookId: string;
  quantity: number;
}

