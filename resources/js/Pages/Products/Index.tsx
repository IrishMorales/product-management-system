import { Product } from '@/types';
import { Head } from '@inertiajs/react'
import { useEffect } from 'react'

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