import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  savedEditingPostSelector,
  setEditingPost,
  setNewPost,
} from 'store/posts';

import Button from 'components/Button/Button';
import {
  DrawerTitleWrapper,
  DrawerTitle,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { UploadSection } from './UploadSection';

import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';

import { savedNewPostSelector } from 'store/posts';
import { NewPost, Post } from 'types';
import { ImageGrid } from 'components/ImageGrid/ImageGrid';
import { addNewImage } from 'services/apiServices';

interface Props {
  onClose: CloseDrawer;
}

const ManageImages: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { id: postId } = useParams<{ id: string }>();

  const savedNewPost = useSelector(savedNewPostSelector());
  const savedEditingPost = useSelector(savedEditingPostSelector());

  const [currentPost, setCurrentPost] = useState<NewPost | Post>(undefined);

  useEffect(() => {
    setCurrentPost(postId === 'new' ? savedNewPost : savedEditingPost);
  }, [savedNewPost, postId, savedEditingPost]);

  const updatePost = (post: NewPost | Post) => {
    if (postId === 'new')
      dispatch(
        setNewPost({
          ...post,
        })
      );
    else
      dispatch(
        setEditingPost({
          ...(post as Post),
        })
      );
  };

  const onStartUpload = async (files: File[], altTags: string[]) => {
    updatePost({
      ...currentPost,
      post: {
        ...currentPost.post,
        altTags: [...currentPost.post.altTags, ...altTags],
        images: [...currentPost.post.images, ...files.map(() => 'UPLOADING')],
      },
    });

    for (const [index, file] of Array.from(files.entries())) {
      const formData = new FormData();
      const stamp = Date.now();
      const name = `${stamp}/${file.name}`;

      formData.append(name, file);

      // Send this form data to a Rest API
      await addNewImage(formData);
      // await testFunc();

      setCurrentPost((_post) => {
        const newImages = [..._post.post.images];

        newImages[
          _post.post.images.length - files.length + index
        ] = `https://share.objectpress.io/${name}`;

        updatePost({
          ..._post,
          post: {
            ..._post.post,
            images: newImages,
          },
        });

        return _post;
      });
    }
  };

  if (!currentPost || !currentPost.post) return null;

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Manage Post Images</DrawerTitle>
      </DrawerTitleWrapper>

      <Scrollbars
        autoHide
        renderView={(props) => (
          <div
            {...props}
            style={{
              ...props.style,
              overflowX: 'hidden',
              height: 'calc(100% - 120px)',
            }}
          />
        )}
        renderTrackHorizontal={(props) => (
          <div
            {...props}
            style={{ display: 'none' }}
            className="track-horizontal"
          />
        )}
      >
        <UploadSection onStartUpload={onStartUpload} />

        <ImageGrid
          images={currentPost.post.images.map((src, index) => ({
            title: currentPost.post.title,
            src,
            alt: currentPost.post.altTags[index],
          }))}
        />
      </Scrollbars>

      <ButtonGroup>
        <Button
          onClick={onClose}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                width: '100%',
                borderTopLeftRadius: '3px',
                borderTopRightRadius: '3px',
                borderBottomRightRadius: '3px',
                borderBottomLeftRadius: '3px',
              }),
            },
          }}
        >
          Close
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ManageImages;
