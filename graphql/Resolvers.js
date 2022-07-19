import Product from '../db/models/Product.model.js';
import { GraphQLScalarType } from 'graphql';

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),

  Query: {
    getAllProducts: async () => {
      return await Product.find();
    },
    getProduct: async (_, { id }) => {
      return await Product.findById(id);
    },
  },

  Mutation: {
    createProduct: async (_, { product }) => {
      console.log('product: ', product);
      const newProduct = new Product(product);
      return await newProduct.save();
    },

    // deleteProduct: async (_, { id }) => {
    //   await Product.findByIdAndDelete(id);
    //   return 'Product deleted';
    // },

    // updateProduct: async (_, { id, product }) => {
    //   const updates = {};

    //   if (product.name !== undefined) {
    //     updates.name = product.name;
    //   }

    //   if (product.price !== undefined) {
    //     updates.price = product.price;
    //   }

    //   if (product.description !== undefined) {
    //     updates.description = product.description;
    //   }

    //   return await Product.findByIdAndUpdate(id, updates, {
    //     new: true,
    //   });
    // },
  },
};
