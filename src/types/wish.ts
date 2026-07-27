export type Wish = {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
};

export type CreateWishInput = {
  author_name: string;
  message: string;
};
