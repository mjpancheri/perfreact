export interface AddProductToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishList({ onAddToWishList, onRequestClose }: AddProductToWishListProps) {
  return (
    <span style={{marginLeft: '0.5rem'}}>
      Deseja adicionar aos favoritos?
      <button style={{marginLeft: '0.5rem'}} onClick={onAddToWishList}>Sim</button>
      <button style={{marginLeft: '0.5rem'}} onClick={onRequestClose}>Não</button>
    </span>
  )
}