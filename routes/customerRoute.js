import express from "express";
import { deleteCustomer, getAllCustomers, postCustomer, updateCustomer } from "../controllers/CustomerController.js";

let customerRouter=express.Router();

customerRouter.get("/", getAllCustomers);
customerRouter.post("/", postCustomer);
customerRouter.delete('/:cid',deleteCustomer);
customerRouter.put('/:cid',updateCustomer)


export default customerRouter