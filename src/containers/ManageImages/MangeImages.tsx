import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Button from 'components/Button/Button';
import {
  DrawerTitleWrapper,
  DrawerTitle,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { UploadSection } from './UploadSection';

import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';

interface Props {
  onClose: CloseDrawer;
}

const ManageImages: React.FC<Props> = ({ onClose }) => {
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
        <UploadSection />
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
