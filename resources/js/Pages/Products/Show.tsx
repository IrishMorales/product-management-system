import { Head } from '@inertiajs/react'
import { Product } from '@/types';
import { useEffect } from 'react';

interface ProductShowProps {
  product: Product
}

export default function ProductShow({ product }: ProductShowProps) {
  useEffect(() => {
    console.log(product)
  }, [product]);

  return (
    <>
        <Head title={product.name} />
        <div>
          
          <div>
            <label>Name</label>
            <p>{product.name}</p>
          </div>
          
          <div>
            <label>Description</label>
            <p>{product.description}</p>
          </div>
          
          <div>
            <label>Stock</label>
            <p>{product.stock}</p>
          </div>
          
          <div>
            <label>Price</label>
            <p>{product.price}</p>
          </div>

        </div>
    </>
  )
}