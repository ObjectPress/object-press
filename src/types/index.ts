/**
 * @type AuthProps
 */
export type AuthProps = {
  isAuthenticated: boolean;
  isValidToken: Function;
  signout: Function;
};

/**
 * @type TokenState
 */
export type TokenState = {
  userId: string | null;
};

/**
 * @type JWToken
 */
export interface JWToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * @type Profile
 */
export interface Profile {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  country: string;
  website: string;
  notify: boolean;
}

/**
 * @type Blog
 */
export interface Blog {
  id: string;
  title: string;
  hook: string;
  description: string;
  active: boolean;
  createDate: string;
}

/**
 * @type NewBlog
 */
export type NewBlog = Pick<Blog, 'title' | 'active'> &
  Pick<Partial<Blog>, 'hook' | 'description'>;

/**
 * @type BlogRow
 */
export interface BlogRow {
  id: string;
  title: string;
  description: string;
  createDate: string;
  active: boolean;
  hook: string;
}

/**
 * @type BlogState
 */
export type BlogState = {
  blogs: Blog[];
  loading: boolean;
  error?: string;
  fetched: boolean;
};

/**
 * @type Content
 */
export interface Content {
  title: string;
  publishAt: string;
  content: string;
  pageTitle: string;
  slug: string;
  keywords: string;
  description: string;
  images: string[];
  altTags: string[];
}

/**
 * @type Post
 */
export type Post = {
  _id: string;
  appId: string;
  active: boolean;
  createDate: string;
  modifiedDate: string;
  post: Content;
};

/**
 * @type NewPost
 */
export type NewPost = {
  appId: string;
  post: Content;
  active: boolean;
};

/**
 * @type UpdatePost
 */
export type UpdatePost = {
  postId: string;
  post: Content;
  active: boolean;
};

/**
 * @type PostRow
 */
export type PostRow = {
  _id: string;
  blog_id: string;
  blogTitle: string;
  post: Post;
  active: boolean;
};

/**
 * @type PostState
 */
export type PostState = {
  posts: Post[];
  loading: boolean;
  error?: string;
  newPost: NewPost;
  editingPost: Post;
};

/**
 * @type Notify
 */
export interface Notify {
  id: string;
  title: string;
  content: string;
  createDate: string;
}

/**
 * @type NotifyState
 */
export type NotifyState = {
  notifications: Notify[];
  loading: boolean;
  error?: string;
};

/**
 * @type InputValidation
 */
export interface InputValidation {
  (value: string): {
    isValid: boolean;
    errorMessage: string | null;
  };
}

/**
 * @type FormControlHook
 */
export interface FormControlHook {
  (validationFunction: InputValidation): {
    value: string;
    isValid: boolean;
    onInputChangeHandler: (e: React.FormEvent<Element>) => void;
    onInputBlurHandler: () => void;
    shouldShowError: boolean;
    setInitialValue: (initialValue: string) => void;
    setValue: (newValue: string) => void;
  };
}

export interface ImageData {
  title: string;
  src: string;
  alt: string;
}
