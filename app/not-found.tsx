import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-12 h-40 w-40 -translate-x-1/2 rounded-full bg-secondary/60 blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              FreshMarket
              <span className="h-1 w-1 rounded-full bg-primary" />
              Page not found
            </span>
            <div className="space-y-4">
              <p className="text-6xl font-semibold tracking-tight text-primary sm:text-7xl">
                404
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                This path wandered off the market
              </h1>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                The page you’re looking for doesn’t exist. Let’s get you back to
                fresh finds, featured vendors, and seasonal picks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/">Go to homepage</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/shop">Browse the shop</Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Need help? Visit your{" "}
              <Link
                href="/account"
                className="text-primary underline-offset-4 hover:underline"
              >
                account
              </Link>
            </div>
          </div>

          <Card className="border-primary/20 bg-card/80 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Popular destinations</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link
                href="/vendors"
                className="group flex items-center justify-between rounded-lg border bg-background/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="font-medium">Local vendors</span>
                <span className="text-muted-foreground transition group-hover:text-primary">
                  Explore
                </span>
              </Link>

              <Link
                href="/sell"
                className="group flex items-center justify-between rounded-lg border bg-background/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="font-medium">Become a vendor</span>
                <span className="text-muted-foreground transition group-hover:text-primary">
                  Start selling
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
