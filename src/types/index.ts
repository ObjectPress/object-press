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
 * @interface JWToken
 * @property sub string
 * @property email string
 * @property iat number
 * @property exp number
 */
export interface JWToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * @interface Profile
 * @property email string
 * @property username string
 * @property firstName string
 * @property lastName string
 * @property company string
 * @property title string
 * @property country string
 * @property website string
 * @property notify boolean
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
 * @interface Blog
 * @property id string
 * @property title string
 * @property hook string
 * @property description string
 * @property active boolean
 * @property createDate string
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
 * @property title string
 * @property active boolean
 * @property hook string | undefined
 * @property description string | undefined
 */
export type NewBlog = Pick<Blog, 'title' | 'active'> &
  Pick<Partial<Blog>, 'hook' | 'description'>;

/**
 * @interface BlogRow
 * @property id string
 * @property title string
 * @property description string
 * @property createDate string
 * @property active boolean
 * @property hook string
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
 * @interface Content
 * @property title string
 * @property publishAt string
 * @property content string
 * @property pageTitle string
 * @property slug string
 * @property keywords string
 * @property description string
 * @property images Array
 * @property altTags Array
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
};

/**
 * @interface Notify
 * @property id string
 * @property title string
 * @property content string
 * @property createDate string
 */
export interface Notify {
  id: string;
  title: string;
  content: string;
  createDate: string;
}
