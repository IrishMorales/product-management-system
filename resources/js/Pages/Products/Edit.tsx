import { Head, router, useForm } from '@inertiajs/react'
import ProductForm from './Form';
import { Product } from '@/types';
import { Box, Card, AbsoluteCenter, Heading } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/Components/Breadcrumbs"

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
    <Box padding={{ base: 4, md: 8, lg: 20 }}>
      <Head title="Edit Product" />
      <AbsoluteCenter axis="horizontal">
        <Card.Root size="lg" minW="2xl">
          <Card.Header>
            <BreadcrumbRoot>
              <BreadcrumbLink onClick={() => router.visit(route('products.index'))}>All Products</BreadcrumbLink>
              <BreadcrumbLink onClick={() => router.visit(route('products.show', { product: product.id }))}>{product.name}</BreadcrumbLink>
              <BreadcrumbCurrentLink>Edit Product</BreadcrumbCurrentLink>
            </BreadcrumbRoot>
            <Heading size="2xl">Edit Product</Heading>
          </Card.Header>
          <Card.Body>
            <ProductForm {...{ data, setData, submit, processing, errors }}></ProductForm>
          </Card.Body>
        </Card.Root>
      </AbsoluteCenter>
    </Box>
  )
}