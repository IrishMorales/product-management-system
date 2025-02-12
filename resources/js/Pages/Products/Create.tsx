import { Head, useForm } from '@inertiajs/react'
import ProductForm from './Form';

export default function ProductCreate({}) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    stock: 0,
    price: 0,
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
          <ProductForm {...{data, setData, submit, processing, errors}}></ProductForm>
        </div>
    </>
  )
}