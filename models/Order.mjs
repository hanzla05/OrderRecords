import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: { type: Number, required: true, unique: true },
    customerId: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    shippingMethod: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
