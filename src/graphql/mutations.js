import { gql } from '@apollo/client';

// login
export const LOGIN_MUTATION = gql`
  mutation LoginUser($user: LoginUser!) {
    loginUser(loginUserData: $user) {
      accessToken
    }
  }
`;

// validate token
export const VALIDATE_MUTATION = gql`
  mutation ValidateUser {
    validateUser {
      accessToken
    }
  }
`;

// update profile
export const PROFILE_MUTATION = gql`
  mutation UpdateUser($user: UpdateUser!) {
    updateUser(updateUserData: $user)
  }
`;

// create blog
export const BLOG_MUTATION = gql`
  mutation AddBlog($blog: CreateBlog!) {
    addBlog(newBlogData: $blog)
  }
`;

// remove  blog
export const REMOVE_BLOG_MUTATION = gql`
  mutation RemoveBlog($blog: String!) {
    removeBlog(appId: $blog)
  }
`;

// update blog
export const UPDATE_BLOG_MUTATION = gql`
  mutation UpdateBlog($blog: UpdateBlog!) {
    updateBlog(updateBlogData: $blog)
  }
`;

// add notification
export const NOTIFICATION_MUTATION = gql`
  mutation AddNotification($notification: NotificationInput!) {
    addNotification(newNotificationData: $notification)
  }
`;

// remove notification
export const REMOVE_NOTIFICATION_MUTATION = gql`
  mutation RemoveNotification($notification: NotificationDelete!) {
    removeNotification(deleteNotificationData: $notification)
  }
`;

// add posts
export const POST_MUTATION = gql`
  mutation AddPost($post: CreatePost!) {
    addPost(newPostData: $post)
  }
`;

// edit post
export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($post: UpdatePost!) {
    updatePost(updatePostData: $post)
  }
`;

// remove post
export const REMOVE_POST_MUTATION = gql`
  mutation RemovePost($post: String!) {
    removePost(postId: $post)
  }
`;

// remove image from post
export const REMOVE_IMAGE_MUTATION = gql`
  mutation RemoveImage($image: RemoveImage!) {
    removeImage(removePostImage: $image)
  }
`;

// create gallery
export const GALLERY_MUTATION = gql`
  mutation AddGallery($gallery: CreateGallery!) {
    addGallery(newGalleryData: $gallery)
  }
`;

// update gallery
export const UPDATE_GALLERY_MUTATION = gql`
  mutation UpdateGallery($gallery: UpdateGallery!) {
    updateGallery(updateGalleryData: $gallery)
  }
`;

// remove gallery
export const REMOVE_GALLERY_MUTATION = gql`
  mutation RemoveGallery($gallery: String!) {
    removeGallery(galleryId: $gallery)
  }
`;

// add gallery image
export const ADD_IMAGE_MUTATION = gql`
  mutation AddGalleryImage($gallery: AddGalleryImage!) {
    addGalleryImage(addGalleryImage: $gallery)
  }
`;

// remove gallery image
export const REMOVE_GALLERY_IMAGE_MUTATION = gql`
  mutation RemoveGalleryImage($image: RemoveGalleryImage!) {
    removeGalleryImage(removePostImage: $image)
  }
`;
