import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/Queries';

export default function Products() {
  const [product, setProduct] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return console.log(error);

  const dateToString10 = (date) =>
    new Date(date).toISOString().slice(0, 10);

  let products = data.getAllProducts
    .filter((product) => {
      return (
        dateToString10(new Date(product.expDate)) ==
          dateToString10(new Date()) && product.status === 'AVAILABLE'
      );
    })
    .sort((a, b) => {
      return new Date(a.expDate) - new Date(b.expDate);
    });

  return (
    <>
      <div>
        {products.map((product, id) => (
          <div
            key={id}
            className='flex flex-row justify-between bg-white text-black shadow-lg rounded-3xl border-green-400 p-5 m-5 text-center'
          >
            <div className='flex flex-row gap-2'>
              {/* <p>{product.barcode}</p> */}
              <p>{product.name}</p>
              <p>{dateToString10(product.expDate)}</p>
            </div>
            <button>Done</button>
          </div>
        ))}
      </div>
    </>
  );
}
