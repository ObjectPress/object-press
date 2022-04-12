import React from 'react';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  Image,
  ProductTitle,
  ProductMeta,
  ProductPriceWrapper,
  ProductPrice,
} from './ProductCard.style';

type ProductCardProps = {
  title: string;
  tag: string;
  image: string;
  index: number;
  data: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  tag,
  image,
  index,
  data,
  ...props
}) => {
  return (
    <ProductCardWrapper {...props}>
      <ProductImageWrapper>
        <Image url={image} />
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{`Post Title: '${title}'`}</ProductTitle>
        <ProductMeta>
          <ProductPriceWrapper>
            <ProductPrice>
              {tag?.length > 0 ? `Alt Tag: '${tag}'` : `Alt Tag: ?`}
            </ProductPrice>
          </ProductPriceWrapper>

          {/*<OrderID>Image: {index}</OrderID>*/}
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
