import { Product } from '@/types';
import {
  Heading,
  HStack,
  Stack,
  Table,
  Box,
  Flex,
  Button,
  IconButton,
  Group
} from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/Components/Pagination"
import { Head, router } from '@inertiajs/react'
import { useEffect } from 'react'
import { FaMagnifyingGlass, FaPencil, FaX } from "react-icons/fa6";

interface ProductIndexProps {
  products: {
    current_page: number,
    data: Product[],
    per_page: number,
    total: number
  }
}

export default function ProductIndex({ products }: ProductIndexProps) {
  useEffect(() => {
    console.log(products)
  }, [products]);

  return (
    <Box padding={{ base: 4, md: 8, lg: 20 }}>
      <Head title="All Products" />
      <Stack width="full" gap="5">
        <Flex justify="space-between" align="center" wrap="wrap" width="full">
          <Heading size="2xl">Products</Heading>
          <Button onClick={() => router.visit(route('products.create'))}>Create Product</Button>
        </Flex>
        <Table.ScrollArea borderWidth="1px">
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader>Stock</Table.ColumnHeader>
                <Table.ColumnHeader>Price (PHP)</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products.data.length > 0 ? (
                products.data.map((product) => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                    <Table.Cell>{product.stock}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell textAlign="end">
                      <Group>
                        <IconButton size={"sm"} variant={"subtle"} aria-label="View" onClick={() => router.visit(route('products.show', { product: product.id }))}>
                          <FaMagnifyingGlass />
                        </IconButton>
                        <IconButton size={"sm"} variant={"subtle"} aria-label="Edit" onClick={() => router.visit(route('products.edit', { product: product.id }))}>
                          <FaPencil />
                        </IconButton>
                        <IconButton size={"sm"} colorPalette={"red"} aria-label="Delete" onClick={() => router.delete(route('products.destroy', { product: product.id }))}>
                          <FaX />
                        </IconButton>
                      </Group>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} textAlign="center">No products found.</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
        <PaginationRoot page={products.current_page} count={products.total} pageSize={products.per_page}
          onPageChange={function (e) {
            router.get(route('products.index', { page: e.page }))
          }}>
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Stack>
    </Box>
  )
}