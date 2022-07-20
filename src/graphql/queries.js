import { gql } from '@apollo/client';

// get blogs
export const PROFILE_QUERY = gql`
  query GetUser {
    getUser {
      id
      email
      username
      firstName
      lastName
      company
      title
      country
      website
      notifications
    }
  }
`;

// get creds
export const CREDS_QUERY = gql`
  query GetCreds {
    getCreds {
      title
      userSecret
      appSecret
    }
  }
`;

// get blogs
export const BLOGS_QUERY = gql`
  query GetAllBlogs {
    getAllBlogs {
      id
      title
      hook
      description
      active
      createDate
    }
  }
`;

// get blog
export const GET_BLOG_QUERY = gql`
  query GetBlogs($blog: String!) {
    getBlog(appId: $blog) {
      id
      title
      hook
      description
      active
      createDate
    }
  }
`;

// get notifications
export const NOTIFICATIONS_QUERY = gql`
  query GetNotification {
    getNotifications {
      id
      title
      content
      createDate
    }
  }
`;

// get all posts
export const POSTS_QUERY = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      appId
      post {
        title
        publishAt
        content
        pageTitle
        description
      }
      active
      modifiedDate
      createDate
    }
  }
`;

// get post
export const GET_POST_QUERY = gql`
  query GetPost($post: String!) {
    getPost(postId: $post) {
      _id
      appId
      post {
        title
        publishAt
        content
        pageTitle
        keywords
        description
        images
        altTags
      }
      active
      createDate
    }
  }
`;

// search posts by title
export const SEARCH_TITLES_QUERY = gql`
  query SearchPost($post: String!) {
    searchPosts(title: $post) {
      _id
      appId
      post {
        title
        publishAt
        content
        pageTitle
        description
        images
        altTags
      }
      active
      modifiedDate
      createDate
    }
  }
`;

// search posts by blog
export const SEARCH_BLOGS_QUERY = gql`
  query SearchBlogs($blog: String!) {
    getBlogPost(appId: $blog) {
      _id
      appId
      post {
        title
        publishAt
        content
        pageTitle
        description
        images
        altTags
      }
      active
      modifiedDate
      createDate
    }
  }
`;

// get galleries
export const GALLERIES_QUERY = gql`
  query GetGalleryList {
    getGalleryList {
      id
      name
      description
      blog
    }
  }
`;

// get gallery
export const GALLERY_QUERY = gql`
  query GetGallery($gallery: String!) {
    getGallery(galleryId: $gallery) {
      id
      name
      description
      images
    }
  }
`;

// get metrics
export const METRICS_QUERY = gql`
  query getMetrics {
    getMetrics {
      blogs
      pendingPosts
      activePosts
      postHistory {
        jan
        feb
        mar
        apr
        may
        jun
        jul
        aug
        sep
        oct
        nov
        dec
      }
      images
    }
  }
`;
