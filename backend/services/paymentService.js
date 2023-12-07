const Payment = require('../models/payment'); // Assuming you have a Payment model
//const stripe = require('stripe')('your_stripe_api_key'); // Replace with your Stripe API key

// Create a new payment
async function createPayment(userId, amount, paymentMethod) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount in cents
      currency: 'usd', // Change to your desired currency
      payment_method: paymentMethod, // Payment method ID from the client
      confirm: true, // Confirm and process the payment immediately
      setup_future_usage: 'off_session', // Use 'on_session' for one-time payments
      description: 'Payment for an order', // Change to a suitable description
    });

    // Save payment details in your database (or you can use webhooks)
    const payment = new Payment({
      userId,
      paymentIntentId: paymentIntent.id,
      amount,
      status: paymentIntent.status,
    });
    
    await payment.save();

    return paymentIntent;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPayment,
};
