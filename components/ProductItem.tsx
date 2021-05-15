import { memo, useState } from 'react';
import dynamic from 'next/dynamic'; // quando não for Next pode usar lazy do React
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import lodash from 'lodash';

import { AddProductToWishListProps } from './AddProductToWishList';
// import { AddProductToWishList } from './AddProductToWishList';
const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <FaSpinner size={20} />
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
    isWish: boolean;
  }
  onAddWishList: (id: number) => void;
}

function ProductItemComponent({ product , onAddWishList}: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div style={{marginBottom: '0.5rem'}}>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button style={{marginLeft: '0.5rem'}} onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos?</button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
      {product.isWish && <FaCheckCircle color="green" size={20} />}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
});