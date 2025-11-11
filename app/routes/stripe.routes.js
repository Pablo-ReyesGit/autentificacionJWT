const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const bodyParser = require("body-parser");

module.exports = (app) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // te lo da Stripe cuando creas el webhook

  // Stripe necesita el raw body para verificar la firma
  app.post(
    "/webhook/stripe",
    bodyParser.raw({ type: "application/json" }),
    (req, res) => {
      const sig = req.headers["stripe-signature"];
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.error("❌ Error verificando firma Stripe:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // ⚙️ Maneja los eventos que quieras escuchar
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log("💰 Pago completado:", paymentIntent.id);
          break;

        case "payment_intent.payment_failed":
          const failedPayment = event.data.object;
          console.log("❌ Pago fallido:", failedPayment.id);
          break;

        default:
          console.log(`🔔 Evento no manejado: ${event.type}`);
      }

      res.json({ received: true });
    }
  );
};
