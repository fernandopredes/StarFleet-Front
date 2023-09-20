export type Post = {
  id: number;
  title: string;
  abstract: string;
  text: string;
  user_id: number;
};

export type CreatePostResponse = {
  post: {
    id: number;
    title: string;
    abstract: string;
    text: string;
    user_id: number;
  };
};
