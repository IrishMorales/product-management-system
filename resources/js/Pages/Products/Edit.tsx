import { Head, useForm } from '@inertiajs/react'
import ProductForm from './Form';
import { Product } from '@/types';

interface ProductEditProps {
  product: Product;
}

export default function ProductEdit({ product }: ProductEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    id: product.id,
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
  });

  function submit(e) {
    e.preventDefault()
    put(`/products/${product.id}`, {
      onSuccess: () => console.log('Submitted'),
      onFinish: () => console.log('Finished')
    })
  }

  return (
    <>
      <Head title="Edit Product" />
      <div>
        <ProductForm {...{data, setData, submit, processing, errors}}></ProductForm>
      </div>
    </>
  )
}