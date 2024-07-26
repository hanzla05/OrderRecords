import express from 'express';
import OrderDetails from '../models/OrderDetails.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const orderDetail = await OrderDetails.create(req.body);
        res.status(201).json({ message: "Order detail added successfully", orderDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orderDetails = await OrderDetails.find();
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
