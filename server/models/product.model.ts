import mongoose, {Schema, Model, Document} from 'mongoose';


// Define the TypeScript interface for the Product document
export interface IProduct {

    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

// Extend the Mongoose Document with our IProduct interface
export interface IProductDocument extends IProduct, Document {}

// Create the Mongoose schema for the Product model
const productSchema = new Schema<IProductDocument>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,       
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,   
        required: true,
    },
}, {
    timestamps: true, // createdAt, updatedAt fields will be automatically added
})

// Create the Mongoose model for the Product collection
const Product : Model<IProductDocument> = mongoose.model<IProductDocument>('Product', productSchema); 

export default Product;