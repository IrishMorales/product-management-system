import { Button, Card, Input, Field, Fieldset, Link, AbsoluteCenter } from '@chakra-ui/react';
import { Head, useForm } from '@inertiajs/react'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default function Login({ }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
  });

  async function submit(e) {
    e.preventDefault();
    post('/auth/login', {
      onFinish: () => reset("password") // clear sensitive data
    });
  }

  return (
    <div>
      <Head title="Login" />
      <AbsoluteCenter axis="both">
        <Card.Root size="lg" maxW="xl" minW="lg">
          <form onSubmit={submit}>
            <Card.Header>
              <Card.Title>{appName}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Fieldset.Root>
                <Fieldset.Content>
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
                </Fieldset.Content>
                <hr/>
                <Button type="submit" loading={processing} disabled={processing}>Log in</Button>
                <Fieldset.HelperText>
                  Don't have an account? <Link variant="underline" href={route('auth.register.show')}>Sign up instead.</Link>
                </Fieldset.HelperText>
              </Fieldset.Root>
            </Card.Body>
          </form>
        </Card.Root>
      </AbsoluteCenter>
    </div>
  )
}