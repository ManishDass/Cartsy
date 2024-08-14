import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Product, { IProduct } from '../../../models/Product';

type Data =
  | { success: boolean; data: IProduct | IProduct[] | null }
  | { success: boolean; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (req.query.productId) {
          const product = await Product.findById(req.query.productId);
          if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
          }
          res.status(200).json({ success: true, data: product });
        } else {
          const products = await Product.find({});
          res.status(200).json({ success: true, data: products });
        }
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error fetching products' });
      }
      break;

    case 'POST':
      try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating product' });
      }
      break;

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(
          req.query.productId,
          req.body,
          { new: true, runValidators: true }
        );
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating product' });
      }
      break;

    case 'DELETE':
      try {
        const product = await Product.findByIdAndDelete(req.query.productId);
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error deleting product' });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
