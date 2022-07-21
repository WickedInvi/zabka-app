import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../graphql/Queries';
import { BiBarcodeReader } from 'react-icons/bi';
import BarcodeScanner from './barcodeScanner/BarcodeScanner';
import itemsLog from './itemsLog.json';

export default function InputForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [dateStamp] = useState(new Date());
  const [status] = useState('AVAILABLE');
  const aDate = new Date('3/10/2022 11:59:44');
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const submitHandler = (e) => {
    e.preventDefault();
    // const product = { barcode, name, dateStamp, startDate, status };
    // // console.log('Handler called');
    // console.log(product);
    // console.log(aDate);
    // createProduct({
    //   variables: {
    //     product: {
    //       barcode: '2222',
    //       name: 'item.name',
    //       expDate: aDate,
    //       dateStamp: aDate,
    //       // status: item.status,
    //     },
    //   },
    // });
    let delay = 0;

    itemsLog.forEach((item, id) => {
      setTimeout(() => {
        createProduct({
          variables: {
            product: {
              barcode: item.barcode,
              name: item.name,
              expDate: item.expDate,
              dateStamp: item.dateStamp,
              status: item.status,
            },
          },
        });
      }, 100 + delay);
      delay += 100;
    });

    e.target.reset();
  };
  const openScanner = () => {};

  return (
    <div>
      {/* <BarcodeScanner setBarcode={setBarcode} /> */}
      <form
        action='submit'
        onSubmit={submitHandler}
        className='flex flex-col gap-10 items-center justify-center mt-20'
      >
        <div className='relative w-3/4'>
          <input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            type='text'
            placeholder='Barcode'
            id='barcode'
            className='w-full p-2 rounded-3xl border-2 border-green-300 text-center'
          />
          <BiBarcodeReader
            size={35}
            className='absolute right-0 top-0 mr-2 mt-1'
            onClick={openScanner}
          />
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Name'
          id='name'
          className='w-3/4 p-2 rounded-3xl border-2 border-green-300 text-center'
        />
        <div className='w-3/4'>
          <input
            type='date'
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className='inline-block w-full p-2 rounded-3xl border-2 border-green-300 text-center'
          />
        </div>
        <button className='mt-52 w-3/4 p-2 rounded-3xl border-2 border-green-300 text-center bg-slate-300'>
          Submit
        </button>
      </form>
      <br />
    </div>
  );
}
