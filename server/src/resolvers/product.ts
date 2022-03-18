import { DBField, writeDB } from "./../dbController";
import { Products, Resolver } from "./types";
import { v4 as uuid } from "uuid";

// const mockProducts = (() =>
//   Array.from({ length: 20 }).map((_, i) => ({
//     id: i + 1 + "",
//     imageUrl: `https://picsum.photos/id/${i + 10}/200/150`,
//     price: 50000,
//     title: `임시상품${i + 1}`,
//     description: `임시상세내용${i + 1}`,
//     createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
//   })))();

// const productResolver: Resolver = {
//   Query: {
//     products: (parent, args, context, info) => {
//       return mockProducts;
//     },
//     product: (parent, { id }, context, info) => {
//       const found = mockProducts.find((item) => item.id === id);
//       if (found) return found;
//       return null;
//     },
//   },
// };

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
  Query: {
    products: (parent, { cursor = "" }, { db }) => {
      const fromIndex =
        db.products.findIndex((product) => product.id === cursor) + 1;
      return db.products.slice(fromIndex, fromIndex + 15) || [];
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find((item) => item.id === id);
      if (found) return found;
      return null;
    },
  },
  Mutation: {
    addProduct: (parent, { imageUrl, price, title, description }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      };
      db.products.push(newProduct);
      setJSON(db.products);
      return newProduct;
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error("없는 상품입니다");
      }
      const updatedItem = {
        ...db.products[existProductIndex],
        ...data,
      };
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return updatedItem;
    },
    deleteProduct: (parent, { id }, { db }) => {
      // 실제 db에서 delete를 하는 대신, createdAt을 지워준다.
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error("없는 상품입니다");
      }
      const updatedItem = {
        ...db.products[existProductIndex],
      };
      delete updatedItem.createdAt;
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return id;
    },
  },
};

export default productResolver;
