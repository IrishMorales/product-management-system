import { Head, router, useForm } from '@inertiajs/react'

export default function Login({}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
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
      <form onSubmit={submit}>
        
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" value={data?.email} onChange={e => setData('email', e.target.value)}/> 
          {errors.email && <div>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={data?.password} onChange={e => setData('password', e.target.value)}/> 
          {errors.password && <div>{errors.password}</div>}
        </div>

        <button type="submit" disabled={processing}>Log in</button>

      </form>
    </div>
  )
}