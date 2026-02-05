'use client'

import { useEffect, useState } from 'react'
import { Settings, User, LogOut, Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { getCurrentUser, logoutAction } from '@/app/actions/auth'
import { getUserProfile, updateUserProfile, updateVendorProfile, changePassword } from '@/app/actions/profile'

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    description: '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    const loadProfile = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      const result = await getUserProfile()
      if (result.ok) {
        setProfile(result.data)
        setFormData({
          name: result.data.name,
          storeName: result.data.vendorProfile?.storeName || '',
          description: result.data.vendorProfile?.description || '',
        })
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
      }
      setLoading(false)
    }

    loadProfile()
  }, [router, toast])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const result = await updateUserProfile({
        name: formData.name,
      })

      if (!result.ok) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
        setIsSaving(false)
        return
      }

      if (user.role === 'VENDOR') {
        const vendorResult = await updateVendorProfile({
          storeName: formData.storeName,
          description: formData.description,
        })

        if (!vendorResult.ok) {
          toast({ title: 'Error', description: vendorResult.error, variant: 'destructive' })
          setIsSaving(false)
          return
        }
      }

      toast({ title: 'Success', description: 'Profile updated successfully' })
      setIsEditing(false)

      // Reload profile
      const updatedResult = await getUserProfile()
      if (updatedResult.ok) {
        setProfile(updatedResult.data)
        setFormData({
          name: updatedResult.data.name,
          storeName: updatedResult.data.vendorProfile?.storeName || '',
          description: updatedResult.data.vendorProfile?.description || '',
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({ title: 'Error', description: 'All fields are required', variant: 'destructive' })
      return
    }

    setIsSaving(true)
    try {
      const result = await changePassword(passwordData)
      if (!result.ok) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
      } else {
        toast({ title: 'Success', description: 'Password changed successfully' })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setShowPasswordForm(false)
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await logoutAction()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Profile not found</p>
        </main>
      </div>
    )
  }

  const tabParam = searchParams.get('tab')
  const defaultTab = ['profile', 'orders', 'security'].includes(tabParam || '')
    ? (tabParam as 'profile' | 'orders' | 'security')
    : 'profile'

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
            <p className="text-muted-foreground">
              Manage your profile{user.role === 'VENDOR' ? ' and vendor store' : ''}
            </p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-6 w-full justify-start border-b border-secondary bg-transparent">
              <TabsTrigger value="profile" className="border-b-2 border-transparent data-[state=active]:border-primary">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="border-b-2 border-transparent data-[state=active]:border-primary">
                Orders
              </TabsTrigger>
              <TabsTrigger value="security" className="border-b-2 border-transparent data-[state=active]:border-primary">
                <Settings className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="border-secondary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Personal Information</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user.role === 'BUYER' ? 'Update your profile' : 'Buyer account information'}
                      </p>
                    </div>
                    <Button
                      variant={isEditing ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        if (isEditing) {
                          handleSaveProfile()
                        } else {
                          setIsEditing(true)
                        }
                      }}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={formData.name}
                        readOnly={!isEditing}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input value={profile.email} readOnly className="mt-2 bg-secondary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Input value={user.role === 'VENDOR' ? 'Vendor' : 'Buyer'} readOnly className="mt-2 bg-secondary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <Input
                      value={new Date(profile.createdAt).toLocaleDateString()}
                      readOnly
                      className="mt-2 bg-secondary"
                    />
                  </div>
                </CardContent>
              </Card>

              {user.role === 'VENDOR' && profile.vendorProfile && (
                <Card className="border-secondary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">Vendor Store Information</h2>
                        <p className="text-sm text-muted-foreground mt-1">Manage your store details</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Store Name</label>
                        <Input
                          value={formData.storeName}
                          readOnly={!isEditing}
                          onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Rating</label>
                        <Input
                          value={`${profile.vendorProfile.rating.toFixed(1)} ⭐`}
                          readOnly
                          className="mt-2 bg-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Store Description</label>
                      <Textarea
                        value={formData.description}
                        readOnly={!isEditing}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-2"
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Total Sales</label>
                        <Input
                          value={profile.vendorProfile.totalSales}
                          readOnly
                          className="mt-2 bg-secondary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Total Earnings</label>
                        <Input
                          value={`$${profile.vendorProfile.earnings.toFixed(2)}`}
                          readOnly
                          className="mt-2 bg-secondary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-xl font-semibold">Order History</h2>
              {profile.orders && profile.orders.length > 0 ? (
                <div className="space-y-4">
                  {profile.orders.map((order: any) => {
                    const statusColors: any = {
                      PENDING: 'bg-yellow-100 text-yellow-800',
                      CONFIRMED: 'bg-blue-100 text-blue-800',
                      SHIPPED: 'bg-purple-100 text-purple-800',
                      DELIVERED: 'bg-green-100 text-green-800',
                      CANCELLED: 'bg-red-100 text-red-800',
                    }

                    return (
                      <Card key={order.id} className="border-secondary">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">Order #{order.id.slice(0, 8)}</p>
                                <Badge className={statusColors[order.status] || 'bg-gray-100 text-gray-800'}>
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                              <div className="text-sm">
                                <p className="text-muted-foreground">
                                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">
                                ${order.totalPrice}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card className="border-secondary">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No orders yet</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="border-secondary">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Change Password</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showPasswordForm ? (
                    <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                      Change Password
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Current Password</label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">New Password</label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confirm Password</label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleChangePassword} disabled={isSaving}>
                          {isSaving ? 'Updating...' : 'Update Password'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowPasswordForm(false)
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-secondary">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Session & Sign Out</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sign out of your account on this device.
                  </p>
                  <Button variant="destructive" className="gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
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
