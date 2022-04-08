import { FC } from 'react';
import { useStyletron } from 'baseui';

import { StyledSpinnerNext } from 'baseui/spinner';

import { Col, Row } from 'components/FlexBox/FlexBox';
import Placeholder from 'components/Placeholder/Placeholder';
import Image from 'components/Image/Image';
import Button, { SIZE } from 'components/Button/Button';

import { ImageData } from 'types';

import {
  LoaderItem,
  ImageContainer,
  AltTag,
  ButtonContainer,
} from './ImageGrid.style';

interface Props {
  images: ImageData[];
  loading?: boolean;
}

const colProps = { md: 4, lg: 3, sm: 6, xs: 12, style: { margin: '15px 0' } };

export const ImageGrid: FC<Props> = ({ images, loading = false }) => {
  const [css] = useStyletron();

  if (loading)
    return (
      <Row>
        <Col {...colProps}>
          <LoaderItem>
            <Placeholder />
          </LoaderItem>
        </Col>
        <Col {...colProps}>
          <LoaderItem>
            <Placeholder />
          </LoaderItem>
        </Col>
        <Col {...colProps}>
          <LoaderItem>
            <Placeholder />
          </LoaderItem>
        </Col>
        <Col {...colProps}>
          <LoaderItem>
            <Placeholder />
          </LoaderItem>
        </Col>
      </Row>
    );
  return (
    <Row>
      {images.map(({ src, alt }, index) => (
        <Col key={index} {...colProps}>
          <ImageContainer>
            {src === 'UPLOADING' ? (
              <StyledSpinnerNext />
            ) : (
              <>
                <Image url={src} alt={alt} style={{ width: '100%' }} />
                <AltTag>{alt}</AltTag>
                <ButtonContainer
                  className={css({
                    width: '100%',
                    justifyContent: 'end',
                  })}
                >
                  <Button
                    size={SIZE.compact}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme }) => ({
                          backgroundColor: $theme.colors.red400,
                          color: $theme.colors.white,
                          ':hover': {
                            backgroundColor: $theme.colors.red700,
                          },
                        }),
                      },
                    }}
                  >
                    Remove
                  </Button>
                </ButtonContainer>
              </>
            )}
          </ImageContainer>
        </Col>
      ))}
    </Row>
  );
};
