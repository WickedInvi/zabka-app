import { gql } from 'apollo-server-micro';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      # id
      barcode
      name
      expDate
      dateStamp
      status
    }
  }
`;

// export const CREATE_PRODUCT = gql`
//   mutation createProduct($barcode: String!, $name: String!) {
//     createProduct(barcode: $barcode, name: $name) {
//       id
//       barcode
//       name
//     }
//   }
// `;
export const CREATE_PRODUCT = gql`
  mutation createProduct($product: ProductInput!) {
    createProduct(product: $product) {
      id
    }
  }
`;
