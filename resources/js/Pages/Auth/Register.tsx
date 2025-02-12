import { Head, useForm } from '@inertiajs/react'

export default function Register({}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  async function submit(e) {
    e.preventDefault();
    post('/auth/register', {
      onFinish: () => reset("password")
    });
  }

  return (
    <div>
      <Head title="Register" />
      <form onSubmit={submit}>

        <div>
          <label htmlFor="name">Name</label>
          <input type="text" value={data?.name} onChange={e => setData('name', e.target.value)}/> 
          {errors.name && <div>{errors.name}</div>}
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" value={data?.email} onChange={e => setData('email', e.target.value)}/> 
          {errors.email && <div>{errors.email}</div>}
        </div>

        <hr/>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={data?.password} onChange={e => setData('password', e.target.value)}/> 
          {errors.password && <div>{errors.password}</div>}
        </div>

        <div>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" value={data?.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)}/> 
          {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
        </div>

        <button type="submit" disabled={processing}>Log in</button>

      </form>
    </div>
  )
}