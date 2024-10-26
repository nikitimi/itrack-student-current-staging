'use client';

import React from 'react';
import Header from '@/components/Header';
import { useClerk } from '@clerk/nextjs';

const Admin = () => {
  const { signOut } = useClerk();
  return (
    <>
      <Header />
      <button onClick={() => void signOut()}>Signout</button>
    </>
  );
};

export default Admin;
