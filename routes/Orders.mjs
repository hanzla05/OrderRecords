import express from 'express';
import Order from '../models/Order.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ message: "Order added successfully", order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
