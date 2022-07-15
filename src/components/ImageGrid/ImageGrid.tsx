import { FC } from 'react';
import Fade from 'react-reveal/Fade';
import { StyledSpinnerNext } from 'baseui/spinner';

import { Col, Row } from 'components/FlexBox/FlexBox';
import Placeholder from 'components/Placeholder/Placeholder';
import ProductCard from 'components/ProductCard/ProductCard';

import { ImageData } from 'types';

import { LoaderItem } from './ImageGrid.style';

interface Props {
  images: ImageData[];
  loading?: boolean;
  onRemove?: () => void;
}

const colProps = { md: 4, lg: 3, sm: 6, xs: 12, style: { margin: '15px 0' } };

export const ImageGrid: FC<Props> = ({ images, loading = false, onRemove }) => {
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
      {images.map(
        ({ src, alt, title, galleryId, postId, isGallery }, index) => (
          <Col key={index} {...colProps}>
            {src === 'UPLOADING' ? (
              <StyledSpinnerNext />
            ) : (
              <Fade bottom duration={800} delay={index * 10}>
                <ProductCard
                  isGallery={isGallery}
                  title={title}
                  tag={alt}
                  image={src}
                  galleryId={galleryId}
                  postId={postId}
                  onRemove={onRemove}
                />
              </Fade>
            )}
          </Col>
        )
      )}
    </Row>
  );
};
