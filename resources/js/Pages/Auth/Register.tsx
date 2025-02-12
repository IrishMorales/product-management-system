import { AbsoluteCenter, Button, Card, Field, Fieldset, Input, Link } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default function Register({ }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  async function submit(e) {
    e.preventDefault();
    post('/auth/register', {
      onFinish: () => {
        reset("password");
        reset("password_confirmation");
      }
    });
  }

  return (
    <div>
      <Head title="Register" />
      <AbsoluteCenter axis="both">
        <Card.Root size="lg" maxW="xl" minW="lg">
          <form onSubmit={submit}>
            <Card.Header>
              <Card.Title>{appName}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root invalid={errors.name ? true : false}>
                    <Field.Label htmlFor="name">Name<Field.RequiredIndicator /></Field.Label>
                    <Input type="text" value={data?.name} onChange={e => setData('name', e.target.value)} />
                    <Field.ErrorText>{errors.name}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={errors.email ? true : false}>
                    <Field.Label htmlFor="email">Email<Field.RequiredIndicator /></Field.Label>
                    <Input type="email" value={data?.email} onChange={e => setData('email', e.target.value)} />
                    <Field.ErrorText>{errors.email}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={errors.password ? true : false}>
                    <Field.Label htmlFor="password">Password<Field.RequiredIndicator /></Field.Label>
                    <Input type="password" value={data?.password} onChange={e => setData('password', e.target.value)} />
                    <Field.ErrorText>{errors.password}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={errors.password_confirmation ? true : false}>
                    <Field.Label htmlFor="password">Confirm Password<Field.RequiredIndicator /></Field.Label>
                    <Input type="password" value={data?.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                    <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>
                  </Field.Root>
                </Fieldset.Content>
                <Button type="submit" loading={processing} disabled={processing}>Sign up</Button>
                <Fieldset.HelperText>
                  Already have an account? <Link variant="underline" href={route('auth.login.show')}>Log in instead.</Link>
                </Fieldset.HelperText>
              </Fieldset.Root>
            </Card.Body>
          </form>
        </Card.Root>
      </AbsoluteCenter>
    </div>
  )
}