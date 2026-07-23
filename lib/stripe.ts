import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const PREMIUM_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || 'price_premium';

export async function createCheckoutSession(userId: string, email: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: PREMIUM_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    customer_email: email,
    metadata: {
      userId,
    },
  });

  return session;
}

export async function getSubscription(stripeSubscriptionId: string) {
  return await stripe.subscriptions.retrieve(stripeSubscriptionId);
}

export async function cancelSubscription(stripeSubscriptionId: string) {
  return await stripe.subscriptions.del(stripeSubscriptionId);
}

export async function verifyWebhookSignature(body: string, signature: string) {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
    return event;
  } catch (error) {
    console.error('[v0] Webhook signature verification failed:', error);
    throw error;
  }
}
