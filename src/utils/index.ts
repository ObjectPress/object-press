import { InputValidation, Post } from 'types';

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const isUrl = (url: string): boolean => {
  const regex =
    // eslint-disable-next-line
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  return regex.test(url);
};

export const isLength = (value: string, length: number): boolean => {
  const validLength = value.length >= length;

  return validLength;
};

export const validateBlogName: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 1);
  let errorMessage: string | null = null;

  if (isValid) {
    errorMessage = null;
  } else {
    errorMessage = 'Blog Name should not be empty';
  }

  return {
    isValid,
    errorMessage,
  };
};

export const validateBuildHook: InputValidation = (value) => {
  let isValueNotEmpty: boolean = isLength(value, 1);
  let isValueUrlFormat: boolean = isUrl(value);
  let isValid: boolean = isValueNotEmpty && isValueUrlFormat;
  let errorMessage: string | null = null;

  if (!isValueUrlFormat) {
    errorMessage = 'Build Hook should be a valid URL';
  }

  if (isValid) {
    errorMessage = null;
  }

  return {
    isValid,
    errorMessage,
  };
};

export const validateDescription: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 10);
  let errorMessage: string | null = null;

  if (isValid) {
    errorMessage = null;
  } else {
    errorMessage = 'Description should have at least 10 characters';
  }

  return {
    isValid,
    errorMessage,
  };
};

export const validateUsername: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 1);
  let errorMessage: string | null = null;

  isValid
    ? (errorMessage = null)
    : (errorMessage = 'Username should not be empty');
  return {
    isValid,
    errorMessage,
  };
};

export const validateFirstName: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 1);
  let errorMessage: string | null = null;

  isValid
    ? (errorMessage = null)
    : (errorMessage = 'First Name should not be empty');
  return {
    isValid,
    errorMessage,
  };
};

export const validateLastName: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 1);
  let errorMessage: string | null = null;

  isValid
    ? (errorMessage = null)
    : (errorMessage = 'Last Name should not be empty');
  return {
    isValid,
    errorMessage,
  };
};

export const validateWebsite: InputValidation = (value) => {
  let isValueNotEmpty: boolean = isLength(value, 1);
  let isValueUrlFormat: boolean = isUrl(value);
  let isValid: boolean = isValueNotEmpty && isValueUrlFormat;
  let errorMessage: string | null = null;

  if (!isValueUrlFormat) {
    errorMessage = 'Website should be a valid URL';
  }

  if (!isValueNotEmpty) {
    errorMessage = 'Website should not be empty';
  }

  if (isValid) {
    errorMessage = null;
  }

  return {
    isValid,
    errorMessage,
  };
};

export const validatePostTitle: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 1);
  let errorMessage: string | null = null;

  isValid
    ? (errorMessage = null)
    : (errorMessage = 'Post Title should not be empty');
  return {
    isValid,
    errorMessage,
  };
};

export const validatePageTitle: InputValidation = (value) => {
  let isValid: boolean = isLength(value, 1);
  let errorMessage: string | null = null;

  isValid
    ? (errorMessage = null)
    : (errorMessage = 'Page Title should not be empty');
  return {
    isValid,
    errorMessage,
  };
};

export const mapBlogImages = (posts: Post[]) => {
  let gallery: string[] = [];
  let postArr: string[] = [];
  let altTags: string[] = [];
  let ids: string[] = [];
  let count: number[] = [];

  posts?.forEach((post: Post) => {
    const content = post.post;
    if (content?.images[0]) {
      gallery.push(...content.images);
      content.images.forEach((item, index) => {
        postArr.push(content.title);
        ids.push(post._id);
        if (postArr.includes(content.title)) {
          count.push(index + 1);
        } else {
          count.push(1);
        }
      });
    }

    if (content?.images[0] && content?.altTags[0]) {
      altTags.push(...content.altTags);
    } else if (content?.images[0]) {
      altTags.push('');
    }
  });

  return {
    gallery,
    altTags,
    postArr,
    count,
    ids,
  };
};
