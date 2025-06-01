import express from 'express';
import { getAllItems, postItem, deleteItem, updateItem } from '../controllers/ItemController.js';

let itemRouter = express.Router();

itemRouter.get('/', getAllItems);
itemRouter.post('/', postItem);
itemRouter.delete('/:itemid', deleteItem);
itemRouter.put('/:itemid', updateItem);

export default itemRouter;
