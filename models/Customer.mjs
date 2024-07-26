import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    customerId: { type: Number, required: true, unique: true },
    customerName: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    customerEmail: { type: String, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
