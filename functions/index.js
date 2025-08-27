const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

const razorpay = new Razorpay({
  key_id: "rzp_live_ALbX7RKvJAGMtR",
  key_secret: "VRcYYj6xEdYRbt9a16uhFt3Q",
});

const corsHandler = cors({ origin: true });

exports.createRazorpayOrder = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { amount } = req.body;

      const options = {
        amount: amount * 100, // convert rupees to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).json({ error: "Order creation failed" });
    }
  });
});