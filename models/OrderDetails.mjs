import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema({
    orderDetailId: { type: Number, required: true, unique: true },
    orderId: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);
export default OrderDetails;
