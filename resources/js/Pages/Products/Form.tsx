import { Product } from '@/types';
import { Field, Fieldset, Input, Button } from '@chakra-ui/react';
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
    <div>
      <form onSubmit={submit}>
        <Fieldset.Root>
          <Fieldset.Content>
            <Field.Root invalid={errors.name ? true : false} required>
              <Field.Label htmlFor="name">Name<Field.RequiredIndicator /></Field.Label>
              <Input type="text" value={data?.name} onChange={e => setData('name', e.target.value)} />
              <Field.ErrorText>{errors.name}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={errors.description ? true : false} required>
              <Field.Label htmlFor="description">Description<Field.RequiredIndicator /></Field.Label>
              <Input type="text" value={data?.description} onChange={e => setData('description', e.target.value)} />
              <Field.ErrorText>{errors.description}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={errors.stock ? true : false} required>
              <Field.Label htmlFor="stock">Stock<Field.RequiredIndicator /></Field.Label>
              <Input type="number" value={data?.stock} min={0} onChange={e => setData('stock', e.target.value)} />
              <Field.ErrorText>{errors.stock}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={errors.price ? true : false} required>
              <Field.Label htmlFor="price">Price<Field.RequiredIndicator /></Field.Label>
              <Input type="number" value={data?.price} min={0} step={0.01} onChange={e => setData('price', e.target.value)} />
              <Field.ErrorText>{errors.price}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>
          <Button type="submit" loading={processing} disabled={processing}>Submit</Button>
        </Fieldset.Root>
      </form>
    </div>
  )
}