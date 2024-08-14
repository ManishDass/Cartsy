import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: Buffer;
  imageType: string;
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: Buffer, required: true },
  imageType: { type: String, required: true },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
