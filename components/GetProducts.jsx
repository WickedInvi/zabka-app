import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/Queries';

export default function GetProducts() {
  const { error, loading, data } = useQuery(GET_ALL_PRODUCTS);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (data) {
      setProduct(data.getAllProducts);
    }
  }, [data]);

  return (
    <>
      <div>
        {product.map((product, id) => (
          <div key={id}>
            <h1>{product.name}</h1>
            <p>{product.barcode}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
