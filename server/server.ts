import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import Product, { type IProductDocument } from './models/product.model.js';
import { connectDB } from './config/db.js';
import {z} from 'zod';
import mongoose from 'mongoose';

// to load environment variables from a .env file into process.env,
//  making them accessible throughout the application. 
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// define input validation schema using zod
const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    imageUrl: z.url("Image URL must be a valid URL"),
    category: z.string().min(1, "Category is required")
})

app.get('/api/products', async (req: Request, res: Response) => {

try {
    const products = await Product.find(); // Retrieve all products from the database.
    res.status(200).json({ success: true, data: products }); // Set the HTTP status code to 200 (OK) and send the products as a JSON response to the client.
} catch (error) {
    res.status(500).json({ message: "Error fetching products" });
}

 

});


/* -------------------------------------- POST ---------------------------------------------------- */

// Route to create a new product
app.post ("/api/products", async(req: Request, res: Response) => {
console.log("starting new product");

 //  Validate the request body against the schema
const validatedProduct = ProductSchema.safeParse(req.body);
if (!validatedProduct.success) {

// if the validation fails, return a 400 Bad Request response with the validation errors, and Zod's flattenError function is used to format the validation errors in a more readable way.
    return res.status(400).json({ message: "Validation failed", errors: z.flattenError(validatedProduct.error) });
  }

// extract the valid data
const productData  = validatedProduct.data; 
const newProduct: IProductDocument = new Product(productData); // create a new instance of the Product model using the validated data

    try {
        const savedProduct : IProductDocument = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error saving product" });
    }
});
/* ------------------------------------------------------------------------------------------ */

/* ------------------------------------ DELETE------------------------------------------------------ */

app.delete("/api/products/:id", async (req: Request, res: Response) => {

   
    const {id} = req.params; // extract the product ID from the request parameters

    //Check if the provided ID is a valid MongoDB ObjectId using mongoose.Types.ObjectId.isValid. 
    if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
}

// Check if the product exists before attempting to delete it.
if (!await Product.findById(id)) {
    return res.status(404).json({ message: "Product not found" });
}

try {
    const deletedProduct = await Product.findByIdAndDelete(id); // it returns the deleted document if it was found and deleted, or null if no document was found with the specified ID. is it boolean? No, it's the deleted document or null, not a boolean.

// if the product was not found and deleted, it returns a 404 Not Found response. Otherwise, it returns a 200 OK response with a success message.
    if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
}

    res.status(200).json({ message: "Product deleted successfully" });
} catch (error) {
    res.status(500).json({ message: "Error deleting product" });
}});
/* ------------------------------------------------------------------------------------------ */

/* ------------------------------------ PUT------------------------------------------------------ */
app.put("/api/products/:id", async (req: Request, res: Response) => {

    const {id} = req.params; // extract the product ID from the request parameters

    //Check if the provided ID is a valid MongoDB ObjectId using mongoose.Types.ObjectId.isValid. 
    if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
}
// Validate the request body against the schema, allowing partial updates (only some fields may be provided). If the validation fails, return a 400 Bad Request response with the validation errors, and Zod's flattenError function is used to format the validation errors in a more readable way.
const validatedProduct = ProductSchema.partial().safeParse(req.body); // validate the request body against the schema, allowing partial updates (only some fields may be provided)
if (!validatedProduct.success) {
    return res.status(400).json({message: "Validation failed", errors: z.flattenError(validatedProduct.error)});
}

// Check if the product exists before attempting to update it.
if (!await Product.findById(id)) {
    return res.status(404).json({ message: "Product not found" });
}

try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }); // it returns the updated document after the update operation is applied, or null if no document was found with the specified ID.

    if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
}

    res.status(200).json({ success: true, data: updatedProduct });
} catch (error) {
    res.status(500).json({ message: "Error updating product" });
}});
/* ------------------------------------------------------------------------------------------ */


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
