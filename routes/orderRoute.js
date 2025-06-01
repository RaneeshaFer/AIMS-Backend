import express from 'express';
import {getAllOrders,postOrder,deleteOrder,updateOrder} from '../controllers/OrderController.js';

let orderRouter = express.Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/', postOrder);
orderRouter.delete('/:oid', deleteOrder);
orderRouter.put('/:oid', updateOrder);

export default orderRouter;