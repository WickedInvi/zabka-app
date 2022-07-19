import Head from 'next/head';
import { useState } from 'react';

import InputForm from '../components/InputForm';

export default function Home() {
  // const [camera, setCamera] = useState(false);
  // const [result, setResult] = useState(null);

  // const onDetected = (result) => {
  //   setResult(result);
  // };

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
      <div className='flex flex-row'>
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
        <InputForm />
      </div>
    </div>
  );
}
