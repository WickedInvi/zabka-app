import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT, GET_ALL_PRODUCTS } from '../graphql/Queries';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { BiBarcodeReader } from 'react-icons/bi';
import 'react-datepicker/dist/react-datepicker.css';

export default function InputForm() {
  const [startDate, setStartDate] = useState(new Date());
  let barcode, name;
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  const submitHandler = (e) => {
    e.preventDefault();
    const barcode = e.target.barcode.value;
    const name = e.target.name.value;
    // const date = e.target.date.value;
    // const dateStamp = new Date(date).getTime();
    // const status = 'AVAILABLE';
    // const product = { barcode, name, date, dateStamp, status };
    // barcode = barcode.value;
    // name = name.value;
    const product = { barcode, name };
    console.log('Handler called');
    console.log(product);
    createProduct({
      variables: {
        product: {
          barcode: barcode,
          name: name,
        },
      },
    });
    // console.log(product);
    // e.target.reset();
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <form
        action='submit'
        onSubmit={submitHandler}
        className='flex flex-col gap-10 items-center justify-center mt-52'
      >
        <input
          ref={(value) => (barcode = value)}
          type='text'
          placeholder='Barcode'
          id='barcode'
          className='w-1/2 p-2 rounded-3xl border-2 border-green-300 text-center'
        />
        {/* <BiBarcodeReader size={40} color="white" /> */}
        <input
          ref={(value) => (name = value)}
          type='text'
          placeholder='Name'
          id='name'
          className='w-1/2 p-2 rounded-3xl border-2 border-green-300 text-center'
        />
        <div className='w-1/2'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className='inline-block w-full p-2 rounded-3xl border-2 border-green-300 text-center'
          />
        </div>
        <button className='mt-52 w-1/2 p-2 rounded-3xl border-2 border-green-300 text-center bg-slate-300'>
          Submit
        </button>
      </form>
      <br />
    </div>
  );
}
