import { Head } from '@inertiajs/react'
import { useEffect } from 'react'

type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
}

interface ProductIndexProps {
  products: Product[];
}

export default function ProductIndex({ products }: ProductIndexProps) {
  useEffect(() => {
    console.log(products)
  }, [products]);

  return (
    <>
        {/* TODO: Frontend for table */}
        <Head title="ProductIndex" />
        <div>ProductIndex</div>
    </>
  )
}