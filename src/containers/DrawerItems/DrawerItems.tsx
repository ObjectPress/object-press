import React, { useCallback, useEffect } from 'react';
import Drawer from 'components/Drawer/Drawer';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { useDrawerState, useDrawerDispatch } from 'context/DrawerContext';
import { useHistory } from 'react-router-dom';

/** Drawer Components */
import NewBlogForm from '../Blogs/NewBlogForm';
import UpdateBlogForm from '../Blogs/UpdateBlogForm';
import NewPostForm from '../Posts/NewPostForm';
import Sidebar from '../Layout/Sidebar/Sidebar';
import ProfileForm from 'containers/Settings/ProfileForm';
import PostUpdateForm from 'containers/Posts/PostUpdateForm';
import CredsForm from 'containers/Settings/CredsForm';
import NewGalleryForm from 'containers/Gallery/NewGalleryForm';
import UpdateGalleryForm from 'containers/Gallery/UpdateGalleryForm';

import ManageImages from 'containers/ManageImages/MangeImages';
import { CloseButton } from './DrawerItems.style';
import AddGalleryImage from 'containers/Gallery/AddGalleryImage';

export type CloseDrawer = () => void;

const DRAWER_COMPONENTS = {
  BLOG_FORM: NewBlogForm,
  UPDATE_BLOG_FORM: UpdateBlogForm,
  POST_FORM: NewPostForm,
  POST_UPDATE_FORM: PostUpdateForm,
  PROFILE_FORM: ProfileForm,
  CREDS_FORM: CredsForm,
  SIDEBAR: Sidebar,
  GALLERY_FORM: NewGalleryForm,
  GALLERY_UPDATE_FORM: UpdateGalleryForm,
  ADD_GALLERY_IMAGE: AddGalleryImage,
  MANAGE_IMAGES: ManageImages,
};

export default function DrawerItems() {
  const history = useHistory();

  const isOpen = useDrawerState('isOpen');
  const drawerComponent = useDrawerState('drawerComponent');
  const data = useDrawerState('data');
  const consumedUrl = useDrawerState('consumedUrl');
  const newUrl = useDrawerState('newUrl');
  const dispatch = useDrawerDispatch();

  const closeDrawer: CloseDrawer = useCallback(() => {
    dispatch({ type: 'CLOSE_DRAWER' });
    dispatch({ type: 'CONSUME_URL_STACK' });
  }, [dispatch]);

  useEffect(() => {
    if (consumedUrl) history.push(consumedUrl);
  }, [consumedUrl, history]);

  useEffect(() => {
    if (newUrl) history.push(newUrl);
  }, [newUrl, history]);

  if (drawerComponent.length === 0) {
    return null;
  }

  const SpecificContent =
    DRAWER_COMPONENTS[drawerComponent[drawerComponent.length - 1]];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex: 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: '80px',
            marginLeft: '60px',
            marginRight: '60px',
            marginBottom: '30px',
            '@media only screen and (max-width: 767px)': {
              marginTop: '80px',
              marginLeft: '30px',
              marginRight: '30px',
              marginBottom: '30px',
            },
          },
        },
        DrawerContainer: {
          style: {
            width: '70vw',
            backgroundColor: '#f7f7f7',
            '@media only screen and (max-width: 767px)': {
              width: '100%',
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width="6px" height="6px" />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data[data.length - 1]} />
    </Drawer>
  );
}
