'use client'

import { useState } from 'react'
import { Settings, LogOut, User, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
  })

  const recentOrders = [
    { id: 'FRM-001', date: 'Dec 15, 2024', total: 24.47, status: 'Delivered' },
    { id: 'FRM-002', date: 'Dec 18, 2024', total: 18.48, status: 'In Transit' },
    { id: 'FRM-003', date: 'Dec 19, 2024', total: 9.98, status: 'Processing' },
  ]

  const savedAddresses = [
    {
      id: 1,
      label: 'Home',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Work',
      address: '456 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      isDefault: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <MainNav />
          <UserNav />
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 sm:px-8 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 w-full justify-start border-b border-secondary bg-transparent">
              <TabsTrigger value="profile" className="border-b-2 border-transparent data-[state=active]:border-primary">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="addresses" className="border-b-2 border-transparent data-[state=active]:border-primary">
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="orders" className="border-b-2 border-transparent data-[state=active]:border-primary">
                Orders
              </TabsTrigger>
              <TabsTrigger value="preferences" className="border-b-2 border-transparent data-[state=active]:border-primary">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="border-secondary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <Button
                      variant={isEditing ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Save Changes' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={userData.fullName}
                        readOnly={!isEditing}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        value={userData.email}
                        readOnly={!isEditing}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={userData.phone}
                      readOnly={!isEditing}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary border-red-200 bg-red-50/30">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-red-800">
                    These actions cannot be undone. Please proceed with caution.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <Button>Add Address</Button>
              </div>

              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <Card key={address.id} className="border-secondary">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{address.label}</h3>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {address.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              {recentOrders.map((order) => (
                <Card key={order.id} className="border-secondary">
                  <CardContent className="flex items-center justify-between pt-6">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <Badge
                        variant={
                          order.status === 'Delivered'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="border-secondary">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Email Preferences</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your orders
                      </p>
                    </div>
                  </label>
                  <Separator />
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <div>
                      <p className="font-medium">Product Recommendations</p>
                      <p className="text-sm text-muted-foreground">
                        Get personalized product suggestions
                      </p>
                    </div>
                  </label>
                  <Separator />
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">
                        Receive special offers and promotions
                      </p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              <Button className="w-full gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t border-secondary bg-secondary/20 py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground sm:px-8">
          <p>© 2024 FreshMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
