// import { useMemo } from "react"
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  totalPrice: string;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
    isWish: boolean;
  }>
  onAddWishList: (id: number) => void;
}

export function SearchResults({ totalPrice, results, onAddWishList }: SearchResultsProps) {
  // melhor do q usar useMemo() é fazer o calculo no momento q o resultado é gerado
  // const totalPrice = useMemo(() => {
  //   return results.reduce((acc, product) => {
  //     return acc + product.price;
  //   }, 0);
  // }, [results]);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} onAddWishList={onAddWishList} />
      </div>
    )
  }
  
  return (
    <div style={{marginTop: '1rem'}}>
      {results.length > 0 && <h3 style={{marginBottom: '0.5rem'}}>Qtd.: {results.length} - Total: {totalPrice}</h3>}
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/* {results.map(product => {
        return (
          <ProductItem key={product.id} product={product} onAddWishList={onAddWishList} />
        )
      })} */}
    </div>
  )
}