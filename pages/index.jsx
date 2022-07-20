import Head from 'next/head';
import { useState } from 'react';
import { GET_ALL_PRODUCTS } from '../graphql/Queries';
import { useQuery } from '@apollo/client';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-5xl font-bold text-center'>Hello</h1>
      <div className='flex flex-col'>
        {data.getAllProducts.map((product, id) => (
          <div key={id}>
            <h1>Name: {product.name}</h1>
            <p>Barcode: {product.barcode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
