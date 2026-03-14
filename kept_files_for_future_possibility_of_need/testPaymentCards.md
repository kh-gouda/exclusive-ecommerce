Successful payment
4242 4242 4242 4242

Any future date
Any CVC

Declined card
4000 0000 0000 0002

Insufficient funds
4000 0000 0000 9995

Incorrect CVC
4000 0000 0000 0127

3D Secure
4000 0027 6000 3184

Step 11 — Deployment on Vercel

Add env variables in Vercel dashboard:

STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL

Then in Stripe dashboard add webhook:

https://yourdomain.com/api/stripe/webhook
