import Head from 'next/head';
import { useState } from 'react';
import { GET_ALL_PRODUCTS } from '../graphql/Queries';
import { useQuery } from '@apollo/client';
import InputForm from '../components/InputForm';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  // const [camera, setCamera] = useState(false);
  // const [result, setResult] = useState(null);

  // const onDetected = (result) => {
  //   setResult(result);
  // };

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
        {/* <BarcodeScannerNoSSR /> */}
        {/* <div>
            <p>{result ? result : 'Scanning...'}</p>
            <button onClick={() => setCamera(!camera)}>
              {camera ? 'Stop' : 'Start'}
            </button>
            <div className='container'>
              {camera && <BarcodeScanner onDetected={onDetected} />}
            </div>
          </div> */}
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
