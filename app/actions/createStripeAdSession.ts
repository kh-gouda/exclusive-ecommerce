"use server";

import { stripe } from "@/app/lib/stripe";
import sql from "@/app/lib/db";

export async function createStripeAdSession(adId: number) {
  //  Get order from database
  const ad = await sql`
    SELECT adid, totalamount, adpaid, stripe_session_id, stripe_session_expires_at
    FROM ads
    WHERE adid = ${adId}
  `;

  const adData = ad[0];

  if (!adData) {
    throw new Error("Ad not found");
  }

  // Prevent duplicate payment
  if (adData.adpaid) {
    return {
      status: "already_paid",
      url: null,
    };
  }

  // Check existing session
  if (adData.stripe_session_id && adData.stripe_session_expires_at) {
    const now = new Date();
    const expiration = new Date(adData.stripe_session_expires_at);

    if (expiration > now) {
      // const session = await stripe.checkout.sessions.retrieve(
      //   adData.stripe_session_id,
      // );

      // if (session.status === "open" && session.url) {
      //   return {
      //     status: "existing_session",
      //     url: session.url,
      //   };
      // }

      try {
        const session = await stripe.checkout.sessions.retrieve(
          adData.stripe_session_id,
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
            name: `Ad #${adData.adid}`,
          },
          unit_amount: adData.totalamount * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/preserve-ad?adid=${adId}&success=true`,

    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/preserve-ad?adid=${adId}&canceled=true`,

    metadata: {
      adid: adData.adid.toString(),
    },

    payment_intent_data: {
      metadata: {
        adid: adData.adid.toString(),
      },
    },
  });

  // Save stripe session id in DB
  await sql`
    UPDATE ads
    SET stripe_session_id = ${session.id}
    WHERE adid = ${adId}
  `;

  // return session url to client
  return {
    status: "created_session",
    url: session.url,
  };
}
