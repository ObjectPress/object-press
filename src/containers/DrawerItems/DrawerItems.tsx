import React, { useCallback } from 'react';
import Drawer from 'components/Drawer/Drawer';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { useDrawerState, useDrawerDispatch } from 'context/DrawerContext';

/** Drawer Components */
import NewBlogForm from '../Blogs/NewBlogForm';
import UpdateBlogForm from '../Blogs/UpdateBlogForm';
import NewPostForm from '../Posts/NewPostForm';
import Sidebar from '../Layout/Sidebar/Sidebar';
import ProfileForm from 'containers/Settings/ProfileForm';
import PostUpdateForm from 'containers/Posts/PostUpdateForm';
import CredsForm from 'containers/Settings/CredsForm';
import { CloseButton } from './DrawerItems.style';

const DRAWER_COMPONENTS = {
  BLOG_FORM: NewBlogForm,
  UPDATE_BLOG_FORM: UpdateBlogForm,
  POST_FORM: NewPostForm,
  POST_UPDATE_FORM: PostUpdateForm,
  PROFILE_FORM: ProfileForm,
  CREDS_FORM: CredsForm,
  SIDEBAR: Sidebar,
};

export default function DrawerItems() {
  const isOpen = useDrawerState('isOpen');
  const drawerComponent = useDrawerState('drawerComponent');
  const data = useDrawerState('data');
  const dispatch = useDrawerDispatch();

  const closeDrawer = useCallback(() => {
    dispatch({ type: 'CLOSE_DRAWER' });
  }, [dispatch]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

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
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
