import { Head } from '@inertiajs/react'
import { Product } from '@/types';
import { useEffect } from 'react';
import { Box, Card, Heading, AbsoluteCenter, DataList } from '@chakra-ui/react';

interface ProductShowProps {
  product: Product
}

export default function ProductShow({ product }: ProductShowProps) {
  useEffect(() => {
    console.log(product)
  }, [product]);

  return (
    <Box padding={{ base: 4, md: 8, lg: 20 }}>
      <Head title={product.name} />
      <AbsoluteCenter axis="horizontal">
        <Card.Root size="lg" minW="2xl">
          <Card.Header>
            <Heading size="2xl">{product.name}</Heading>
          </Card.Header>
          <Card.Body>
            <DataList.Root orientation="horizontal">
              <DataList.Item key={product.name}>
                <DataList.ItemLabel>Name</DataList.ItemLabel>
                <DataList.ItemValue>{product.name}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={product.description}>
                <DataList.ItemLabel>Description</DataList.ItemLabel>
                <DataList.ItemValue>{product.description}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={product.stock}>
                <DataList.ItemLabel>Stock</DataList.ItemLabel>
                <DataList.ItemValue>{product.stock}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={product.price}>
                <DataList.ItemLabel>Price</DataList.ItemLabel>
                <DataList.ItemValue>{product.price}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Card.Body>
        </Card.Root>
      </AbsoluteCenter>
    </Box>
  )
}