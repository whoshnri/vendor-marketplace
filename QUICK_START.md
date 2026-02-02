# FreshMarket Quick Start Guide

## 🚀 Get Up and Running in Minutes

### Step 1: Environment Setup
Add these variables to your Vercel project settings (or `.env.local`):

```
DATABASE_URL=your-neon-connection-string
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
RESEND_API_KEY=re_xxxxx (optional)
```

### Step 2: Database Migration
```bash
npx prisma migrate dev --name init
npx prisma db seed  # Optional: seed sample data
```

### Step 3: Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000` to see FreshMarket!

## 📱 Test the App

### As a Buyer:
1. Visit homepage - see featured items
2. Go to Shop - filter by category, price, organic
3. Add items to cart
4. Checkout with multi-step form
5. View orders in Orders page

### As a Vendor:
1. Click "Become a Vendor" on homepage
2. Create vendor account
3. Access Vendor Dashboard at `/vendor/dashboard`
4. Manage products at `/vendor/products`
5. View payouts at `/vendor/payouts`

## 🎨 Customize the Green Theme

Edit `/app/globals.css` to change colors:

```css
:root {
  --primary: 132 61% 48%;      /* Main green */
  --secondary: 120 40% 90%;    /* Light green */
  --accent: 84 89% 43%;        /* Accent yellow */
}
```

## 📋 All Available Pages

**Public Pages:**
- `/` - Homepage
- `/shop` - Shopping with filters
- `/cart` - Cart management
- `/checkout` - Checkout flow
- `/login` - Sign in
- `/signup` - Create account
- `/vendors` - Browse vendors
- `/sell` - Vendor registration
- `/orders` - Order history
- `/account` - User profile

**Vendor Pages:**
- `/vendor/dashboard` - Analytics
- `/vendor/products` - Product management
- `/vendor/payouts` - Payment management

## 🔑 Key Features

✅ **Shopping**
- Category filtering (Produce, Dairy, Bakery, etc.)
- Price range filters
- Search by name/vendor
- Vendor ratings & verification

✅ **Cart & Checkout**
- Add/remove items
- Real-time totals
- Multi-step checkout
- Order tracking

✅ **Vendor Tools**
- Sales analytics
- Product management
- Inventory tracking
- Payout history

✅ **User Accounts**
- Profile management
- Address book
- Order history
- Preferences

## 🔌 Integration Checklist

- [ ] Database migration complete
- [ ] Stripe keys added to environment
- [ ] Authentication configured
- [ ] Email service set up (Resend/SendGrid)
- [ ] Images uploaded to CDN
- [ ] Deploy to Vercel

## 📚 Important Files

| File | Purpose |
|------|---------|
| `/prisma/schema.prisma` | Database schema |
| `/lib/cart-context.tsx` | Shopping cart state |
| `/app/globals.css` | Green theme colors |
| `/.env.example` | Environment template |

## 🛠 Common Tasks

### Add a New Food Category
Edit mock data in `/app/page.tsx` and `/app/shop/page.tsx`:
```tsx
const foodCategories = [
  { id: "produce", name: "Fresh Produce", icon: "🥕", count: 124 },
  // Add new category here
]
```

### Change Brand Name
Update in `/components/main-nav.tsx`:
```tsx
<span className="text-lg text-primary">YourBrandName</span>
```

### Update Shipping Costs
In `/lib/cart-context.tsx`:
```tsx
const shipping = subtotal > 50 ? 0 : 5.99; // Edit amounts
```

## 🎯 Next Priority Tasks

1. **Connect Authentication** - Implement Supabase Auth or NextAuth.js
2. **Setup Stripe** - Add payment processing to checkout
3. **Database Seeding** - Add real product data
4. **Email Notifications** - Configure Resend for order updates
5. **Search** - Implement full-text search
6. **Reviews** - Add product review system

## 📞 Need Help?

- Check `/IMPLEMENTATION_GUIDE.md` for detailed documentation
- Review Prisma: https://www.prisma.io/docs/
- Explore Next.js: https://nextjs.org/docs
- Browse shadcn/ui: https://ui.shadcn.com

## 🎉 You're Ready!

The entire UI and structure is complete. Just add authentication, payments, and optional email service to go live. Happy building!
