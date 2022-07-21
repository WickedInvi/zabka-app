import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar Date

  type Product {
    id: ID!
    barcode: String!
    name: String!
    expDate: String!
    dateStamp: Date
    status: enumProductStatus
  }

  enum enumProductStatus {
    AVAILABLE
    SOLD
    EXPIRED
  }

  type Query {
    getAllProducts: [Product]
    getProduct(id: ID!): Product
  }

  input ProductInput {
    barcode: String!
    name: String
    expDate: String!
    dateStamp: String!
    status: enumProductStatus! = AVAILABLE
  }

  type Mutation {
    createProduct(product: ProductInput!): Product!
    # deleteProduct(id: ID!): String
    # updateProduct(id: ID!, product: ProductInput): Product
  }
`;
