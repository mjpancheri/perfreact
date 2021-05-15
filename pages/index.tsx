import { FormEvent, useState, useCallback } from "react"
import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
  isWish: boolean;
}
type Results = {
  totalPrice: string;
  data: Product[];
}
export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: '',
    data: [],
  });

  const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      setResults({
        totalPrice: '',
        data: [],
      });
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const products = data.map(product => {
      product.priceFormatted = formatter.format(product.price);
      return product;
    })

    const totalPrice = data.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    setResults({
      totalPrice: formatter.format(totalPrice),
      data: products,
    });
  }

  const addWishList = useCallback((id: number) => {
    console.log(id);
  }, [])

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />

        <button type="submit">Buscar</button>
      </form>
      <SearchResults totalPrice={results.totalPrice} results={results.data} onAddWishList={addWishList} />
    </div>
  )
}
