import { stripe } from "@/app/lib/stripe";
import sql from "@/app/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);

    return new NextResponse("Webhook Error", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderid = Number(session.metadata?.orderid);
        const adid = Number(session.metadata?.adid);

        if (orderid) {
          await sql`
            UPDATE orders SET
            orderpaid = true,
            orderconfirmed = true
            WHERE orderid = ${orderid}
          `;
        }

        if (adid) {
          await sql`
            UPDATE ads SET
            adpaid = true
            WHERE adid = ${adid}
          `;
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;

        const orderid = intent.metadata?.orderid;

        if (orderid) {
          throw new Error("Payment Failed");

          // await sql`
          //   UPDATE orders
          //   SET payment_status = 'failed'
          //   WHERE orderid = ${Number(orderid)}
          // `;
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderid = session.metadata?.orderid;

        if (orderid) {
          throw new Error("Payment Session Expired");

          // await sql`
          //   UPDATE orders
          //   SET payment_status = 'expired'
          //   WHERE orderid = ${Number(orderid)}
          // `;
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        throw new Error(event.type);
    }
  } catch (err) {
    console.error("Webhook handler error", err);

    return new NextResponse("Webhook handler failed", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
