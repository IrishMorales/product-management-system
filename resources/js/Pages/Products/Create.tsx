import { Head, useForm } from '@inertiajs/react'
import ProductForm from './Form';
import { Box, Card, AbsoluteCenter, Heading } from '@chakra-ui/react';

export default function ProductCreate({ }) {
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
    <Box padding={{ base: 4, md: 8, lg: 20 }}>
      <Head title="Create Product" />
      <AbsoluteCenter axis="horizontal">
        <Card.Root size="lg" minW="2xl">
          <Card.Header>
            <Heading size="2xl">Create Product</Heading>
          </Card.Header>
          <Card.Body>
            <ProductForm {...{ data, setData, submit, processing, errors }}></ProductForm>
          </Card.Body>
        </Card.Root>
      </AbsoluteCenter>
    </Box>
  )
}