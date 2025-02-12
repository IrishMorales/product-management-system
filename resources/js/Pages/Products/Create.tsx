import { Head, useForm } from '@inertiajs/react'
import ProductForm from './Form';

export default function ProductCreate({}) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  function submit(e) {
    e.preventDefault()
    post('/products', {
      onSuccess: () => console.log('Submitted'),
      onFinish: () => console.log('Finished')
    })
  }

  return (
    <>
        <Head title="Create Product" />
        <div>
          <form onSubmit={submit}>

            <label htmlFor="name">Name</label>
            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}/>
            {errors.name && <div>{errors.name}</div>}

            <label htmlFor="description">Description</label>
            <input type="text" value={data.description} onChange={e => setData('description', e.target.value)}/>
            {errors.description && <div>{errors.description}</div>}

            <label htmlFor="price">Price</label>
            <input type="number" min="0" value={data.price} onChange={e => setData('price', e.target.value)}/>
            {errors.price && <div>{errors.price}</div>}

            <label htmlFor="stock">Stock</label>
            <input type="number" min="0" value={data.stock} onChange={e => setData('stock', e.target.value)}/>
            {errors.stock && <div>{errors.stock}</div>}

            <button type="submit" disabled={processing}>Submit</button>

          </form>
          {/* <ProductForm></ProductForm> */}
        </div>
    </>
  )
}