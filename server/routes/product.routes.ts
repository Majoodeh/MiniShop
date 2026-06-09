import express from 'express';
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct} from '../controllers/product.controller.js';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Create a new product
router.post('/', createNewProduct);

// Update a product by ID
router.put('/:id', updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

export default router;
