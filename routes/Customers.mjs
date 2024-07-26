import express from 'express';
import Customer from '../models/Customer.mjs';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ message: "Customer added successfully", customer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);

        const customerData = await Customer.aggregate([
            { $match: { customerId: customerId } },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'customerId',
                    foreignField: 'customerId',
                    as: 'orders'
                }
            },
            { $unwind: '$orders' },
            {
                $lookup: {
                    from: 'orderdetails',
                    localField: 'orders.orderId',
                    foreignField: 'orderId',
                    as: 'orders.orderDetails'
                }
            },
            {
                $group: {
                    _id: '$customerId',
                    customerId: { $first: '$customerId' },
                    customerName: { $first: '$customerName' },
                    shippingAddress: { $first: '$shippingAddress' },
                    customerEmail: { $first: '$customerEmail' },
                    orders: { $push: '$orders' }
                }
            },
            {
                $project: {
                    _id: 0,
                    customerId: 1,
                    customerName: 1,
                    shippingAddress: 1,
                    customerEmail: 1,
                    orders: 1
                }
            }
        ]);

        res.status(200).json({ message: "Customer data retrieved successfully", customerData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
