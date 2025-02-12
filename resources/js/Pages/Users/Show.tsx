import { Head } from '@inertiajs/react'
import { User } from '@/types';
import { useEffect } from 'react';

interface UserShowProps {
  user: User
}

export default function UserShow({ user }: UserShowProps) {
  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <>
        <Head title="Profile" />
        <div>
          
          <div>
            <label>Name</label>
            <p>{user.name}</p>
          </div>
          
          <div>
            <label>Email</label>
            <p>{user.email}</p>
          </div>

        </div>
    </>
  )
}