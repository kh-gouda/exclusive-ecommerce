"use server";

import { stripe } from "@/app/lib/stripe";
import sql from "@/app/lib/db";

export async function createStripeCheckoutSession(
  orderid: number,
  userid: string,
) {
  //  Get order from database
  const order = await sql`
    SELECT orderid, totalamount, orderpaid, stripe_session_id, stripe_session_expires_at
    FROM orders
    WHERE orderid = ${orderid}
  `;

  const orderData = order[0];

  if (!orderData) {
    throw new Error("Order not found");
  }

  // Prevent duplicate payment
  if (orderData.orderpaid) {
    return {
      status: "already_paid",
      url: null,
    };
  }

  // Check existing session
  if (orderData.stripe_session_id && orderData.stripe_session_expires_at) {
    const now = new Date();
    const expiration = new Date(orderData.stripe_session_expires_at);

    if (expiration > now) {
      try {
        const session = await stripe.checkout.sessions.retrieve(
          orderData.stripe_session_id,
        );

        if (session.status === "open" && session.url) {
          return {
            status: "existing_session",
            url: session.url,
          };
        }
      } catch (error) {
        // Session might be invalid/expired in Stripe, continue to create new one
        console.log("Failed to retrieve session, creating new one:", error);
      }
    }
  }

  // Create New Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Order #${orderData.orderid}`,
          },
          unit_amount: Math.round(orderData.totalamount * 100), // Stripe uses cents
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/${userid}/checkout?orderid=${orderid}&success=true`,

    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/${userid}/checkout?orderid=${orderid}&canceled=true`,

    metadata: {
      orderid: orderData.orderid.toString(),
      userid: userid,
    },

    payment_intent_data: {
      metadata: {
        orderid: orderData.orderid.toString(),
        userid,
      },
    },
  });

  // Save stripe session id in DB
  const expiresAt = new Date(session.expires_at * 1000);
  await sql`
    UPDATE orders SET
    stripe_session_id = ${session.id},
    stripe_session_expires_at = ${expiresAt}
    WHERE orderid = ${orderid}
  `;

  // return session url to client
  return {
    status: "created_session",
    url: session.url,
  };
}
