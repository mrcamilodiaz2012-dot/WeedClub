import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fallback', {
  apiVersion: '2026-05-27.dahlia' as any, // Cast to avoid literal type mismatches
});

// Using a service role key here because webhooks need to bypass RLS to update club tiers
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const clubId = session.client_reference_id;
      const customerId = session.customer as string;

      if (clubId) {
        // Upgrade club to premium
        await supabase
          .from('clubs')
          .update({ 
            subscription_tier: 'premium',
            stripe_customer_id: customerId
          })
          .eq('id', clubId);
      }
      break;
    
    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const subscription = event.data.object as Stripe.Subscription;
      const subCustomerId = subscription.customer as string;

      // Downgrade to free
      await supabase
        .from('clubs')
        .update({ subscription_tier: 'free' })
        .eq('stripe_customer_id', subCustomerId);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
