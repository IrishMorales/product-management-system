import { Product } from '@/types';
import { useEffect } from 'react'

interface ProductFormProps {
  data: Product,
  setData: Function,
  submit: (e: React.FormEvent) => void,
  processing: boolean,
  errors: Record<string, string>
}

export default function ProductForm({ data, setData, submit, processing, errors }: ProductFormProps) {
  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <>
        <div>
          <form onSubmit={submit}>

          <label htmlFor="name">Name</label>
          <input type="text" value={data?.name} onChange={e => setData('name', e.target.value)}/>
          {errors.name && <div>{errors.name}</div>}

          <label htmlFor="description">Description</label>
          <input type="text" value={data?.description} onChange={e => setData('description', e.target.value)}/>
          {errors.description && <div>{errors.description}</div>}

          <label htmlFor="price">Price</label>
          <input type="number" min="0" value={data?.price} onChange={e => setData('price', e.target.value)}/>
          {errors.price && <div>{errors.price}</div>}

          <label htmlFor="stock">Stock</label>
          <input type="number" min="0" value={data?.stock} onChange={e => setData('stock', e.target.value)}/>
          {errors.stock && <div>{errors.stock}</div>}

          <button type="submit" disabled={processing}>Submit</button>

          </form>
        </div>
    </>
  )
}